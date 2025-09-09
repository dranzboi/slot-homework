import {Session} from "../../domain/entity/Session";
import {IsNumber, IsUUID} from "class-validator";

export class SessionDto {
    
    @IsUUID()
    readonly id: string;
    
    @IsNumber()
    readonly balance: number;
    
    constructor(session: Session) {
        this.id = session.id;
        this.balance = session.balance;
    }
}