import {v4} from "uuid";
import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Session} from "./Session";
import {DomainException} from "../DomainException";

@Entity()
export class Account {

    @PrimaryColumn({type: 'uuid'})
    id: string = v4();
    
    @Column()
    name: string;
    
    @Column()
    password: string;
    
    @Column({
        type: 'int',
        default: 0,
    })
    balance: number = 0;


    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
    
    transferCreditsFrom(session: Session) {
        DomainException.ifThrow(
            session.isGuest() || session.accountId != this.id, 
            "Session belong to another account or it is the guest session"
        );
        
        const v = session.getCreditsForTransfer();
        
        DomainException.ifThrow(v < 1, "Not enough credits in session");

        this.balance += v;
    }
    
    static build() {
        return new Account();
    }
}