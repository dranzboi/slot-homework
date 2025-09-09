import {IsNumber} from "class-validator";

export class RollResoponse {
    
    @IsNumber()
    readonly balance: number;
    
    @IsNumber()
    readonly reward: number;
    
    constructor(context) {
        const {
            session,
            reward,
        } = context
     
        this.balance = session.balance;
        this.reward = reward;
    }
}