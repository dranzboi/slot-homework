import {Session} from "../entity/Session";

export interface RewardManager {

    roll(session: Session): number;
}