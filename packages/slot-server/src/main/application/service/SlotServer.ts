import {Inject, Injectable, Logger} from "@nestjs/common";
import {EntityNotFoundError, Repository} from "typeorm";
import {Session} from "../../domain/entity/Session";
import {Account} from "../../domain/entity/Account";
import {InjectRepository} from "@nestjs/typeorm";
import {NewSession} from "../dto/NewSession";
import {DomainException} from "../../domain/DomainException";
import {SessionDto} from "../dto/SessionDto";
import {RewardManager} from "../../domain/reward-manager/RewardManager";
import {CheatingRewardManager} from "../../domain/reward-manager/CheatingRewardManager";
import {Config} from "../../Config";
import {RollResoponse} from "../dto/RollResoponse";
import * as console from "node:console";

@Injectable()
export class SlotServer {

    protected rollCost = Config.rollCost;
    
    protected readonly logger: Logger = new Logger("SlotServer");
    constructor(
        @InjectRepository(Session)
        protected readonly sessionRepository: Repository<Session>,
        @InjectRepository(Account)
        protected readonly accountRepository: Repository<Account>,
        @Inject(CheatingRewardManager.CONTAINER_TOKEN)
        protected readonly rewardManager: RewardManager
    ) {}

    async findSession(context) {
        const {
            sessionId: id
        } = context;
        
        const s = await this.sessionRepository.findOneByOrFail({
            id
        });
        
        return new SessionDto(s);
    }
    async startGameSession(context: NewSession) {
        const {
            accountId: id
        } = context
        
        const account = await this.accountRepository.findOneBy({id});
        
        const s = Session.build({account});
        
        await this.sessionRepository.save(s)
        
        return new SessionDto(s);
    }

    async closeGameSession(context) {
        const {
            sessionId: id
        } = context

        return this.sessionRepository.manager.transaction(async (transactionalEntityManager) => {
            let session;

            //hide 404
            try {
                // session = await this.sessionRepository.findOneByOrFail({id});
                session = await transactionalEntityManager.findOneOrFail(Session, {
                    where: {
                        id
                    },
                    lock: {mode: "pessimistic_write"}
                });
                
            } catch (e) {
                return;
            }

            try {
                if (!session.isGuest()) {
                    const account = await transactionalEntityManager.findOneOrFail(Account, {
                        where: {
                            id: session.accountId
                        },
                        lock: {mode: "pessimistic_write"}
                    });

                    account.transferCreditsFrom(session)

                    await transactionalEntityManager.save(Account, account);
                }
            } catch (e) {
                if (e instanceof DomainException) {
                    this.logger.log(e.message);
                } else if (e instanceof EntityNotFoundError) {
                    this.logger.error(`Session with wrong accountId: ${session.accountId}`);
                } else {
                    throw e;
                }
            }
            
            await transactionalEntityManager.delete(Session, session.id); 
        });
    }
    
    async roll(context) {
        const {
            sessionId: id
        } = context;
        
        return this.sessionRepository.manager.transaction(async (transactionalEntityManager) => {
            const session = await transactionalEntityManager.findOneOrFail(Session, {
                where: {
                    id
                },
                lock: {mode: "pessimistic_write"}
            });

            session.roll(this.rollCost);
            const reward = this.rewardManager.roll(session);
            session.addCredits(reward);

            await transactionalEntityManager.save(session);

            return new RollResoponse({session, reward});
        });
    }
}
