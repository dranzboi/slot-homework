import {ChanceBasedRewardManager} from "./ChanceBasedRewardManager";
import {Injectable} from "@nestjs/common";
import {Session} from "../entity/Session";
import {Config} from "../../Config";
import * as console from "node:console";

@Injectable()
export class CheatingRewardManager extends ChanceBasedRewardManager {

    protected rerollThresholds: {credits: number, rerollChance: number} [] = [];
    static CONTAINER_TOKEN = "CheatingRewardManager";
    
    constructor() {
        super();
        
        this.rerollThresholds = Config.rewardManagers.cheatingThreshold;
        this.rerollThresholds.sort((l, r) => r.credits - l.credits);
    }

    roll(session: Session) {
        let won = super.rollWin(this.winRate);
        
        if (!won) {
            return 0;
        }
        
        for (const threshold of this.rerollThresholds) {
            if (session.balance > threshold?.credits) {
                this.logger.log(`Try to reroll with rerollChance ${threshold.rerollChance}`);
                
                won = this.rollWin(threshold.rerollChance) ? super.rollWin(this.winRate) : won;     
                
                break
            }
        }
        
        return won ? this.rollReward() : 0;
    }

    protected tryRerollWin(rerollChance, old) {
        
    }
    
    static provide() {
        return {
            provide: CheatingRewardManager.CONTAINER_TOKEN,
            useClass: CheatingRewardManager
        }
    }
}