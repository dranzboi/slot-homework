import {v4} from "uuid";
import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Config} from "../../Config";
import {DomainException} from "../DomainException";

@Entity()
export class Session {

    @PrimaryColumn({type: 'uuid'})
    id: string = v4();

    @Column("int")
    balance: number = Config.freeCredits;
    
    @Column({
        name: 'account_id',
        type: 'uuid',
        nullable: true,
    })
    accountId: string;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    addCredits(val) {
        this.balance += val;
    }
    
    roll(cost = 0) {
        DomainException.ifThrow(!this.canRoll(cost), "Not enough credits for roll");
        
        this.balance -= cost;
    }
    canRoll(cost = 0) {
        return this.balance >= cost;
    }
    
    isGuest() {
        return !this.accountId    
    }
    
    getCreditsForTransfer() {
        const v = this.balance - Config.freeCredits;
        
        return v > 0 ? v : 0;
    }
    
    static build(context) {
        const s = new Session();
        
        s.accountId = context?.account?.id;
        
        return s;
    }
}