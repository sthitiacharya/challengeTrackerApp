import { User } from "./user";
import { Reward } from "./reward";

export class RewardsHistory {
    rewardsHistoryId: number | undefined;
    dateOfRedemption: Date | undefined;
    redeemPointValue: number | undefined;
    reward: Reward | undefined;
    user: User | undefined;

    constructor(reward?: Reward, user?: User)
    {
        this.reward = reward;
        this.user = user;
    }

}
