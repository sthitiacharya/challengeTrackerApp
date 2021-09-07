import { Milestone } from './milestone';

export class UpdateMilestoneReq {
    milestone: Milestone | undefined;
    programId: number | undefined | null;
    targetCompletionDate: string | undefined | null;

    constructor(milestone?: Milestone, programId?: number | null, targetCompletionDate?: string)
    {
        this.milestone = milestone;
        this.programId = programId;
        this.targetCompletionDate = targetCompletionDate;
    }
}
