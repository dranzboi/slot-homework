import {RewardManager} from "./RewardManager";
import {Injectable, Logger} from "@nestjs/common";
import {Session} from "../entity/Session";
import {Config} from "../../Config";
import * as console from "node:console";

@Injectable()
export class ChanceBasedRewardManager implements RewardManager {

    protected winRate = Config.rewardManagers.baseWinRate;
    
    protected readonly logger: Logger = new Logger("RewardManager");
    protected readonly rewards: {credits: number; weight: number}[] = [];

    static CONTAINER_TOKEN = "ChanceBasedRewardManager";
    
    constructor() {
        this.rewards = [
            {credits: 30, weight: 20},
            {credits: 20, weight: 30},
            {credits: 10, weight: 40},
            {credits: 40, weight: 10}
        ];

        this.rewards.sort((l, r) => r.weight - l.weight);
    }

    roll(session: Session) {
        return this.rollWin(this.winRate) ? this.rollReward() : 0;
    }

    protected rollWin(rate) {
        const chance = this.rand();
        const isWon = chance <= rate;
        
        this.logger.log(`RollWin: got chance: ${chance}, won: ${isWon}`);
        
        return isWon;
    }

    protected rollReward() {
        const maxWeight = this.rewards.reduce((acc, rew) => {
            return acc + rew.weight;
        }, 0);

        const chance = this.rand(maxWeight);
        let weight = 0;

        for (const rew of this.rewards) {
            weight += rew.weight;

            if (chance < weight) {
                this.logger.log(`RollReword: got chance: ${chance}, reward: ${rew.credits}`);

                return rew.credits;
            }
        }

        return 0;
    }

    protected rand(max = 100) {
        // 1 -> max
        return Math.floor(Math.random() * max) + 1;
    }
    
    static provide() {
        return { 
            provide: ChanceBasedRewardManager.CONTAINER_TOKEN, 
            useClass: ChanceBasedRewardManager 
        }
    }
}