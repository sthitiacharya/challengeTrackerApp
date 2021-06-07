import { ProgressHistory } from "./progress-history";

export class CreateProgHistoryReq {

    progressHistory: ProgressHistory | undefined;
    milestoneId: number | undefined;

    constructor(progressHistory?: ProgressHistory, milestoneId?: number)
    {
        this.progressHistory = progressHistory;
        this.milestoneId = milestoneId;
    }
}
