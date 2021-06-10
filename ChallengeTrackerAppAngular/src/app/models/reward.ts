export class Reward {
    rewardId: number | undefined;
    rewardCode: string | undefined;
    rewardTitle: string | undefined;
    rewardDescription: string | undefined;
    rewardType: string | undefined;
    storeAddress: string | undefined;
    rewardImageLink: string | undefined;
    redeemablePoints: number | undefined;

    constructor(rewardCode?: string, rewardTitle?: string, rewardDescription?: string, rewardType?: string, redeemablePointValue?: number)
    {
        this.rewardCode = rewardCode;
        this.rewardTitle = rewardTitle;
        this.rewardDescription = rewardDescription;
        this.rewardType= rewardType;
        this.redeemablePoints = redeemablePointValue;
    }
}
