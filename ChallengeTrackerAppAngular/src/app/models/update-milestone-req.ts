import { Milestone } from './milestone';

export class UpdateMilestoneReq {
    milestone: Milestone | undefined;
    programId: number | undefined | null;
    targetCompletionDate: string | undefined | null;
    assignedUserId: number | undefined | null;

    constructor(milestone?: Milestone, programId?: number | null, targetCompletionDate?: string, assignedUserId?: number | null)
    {
        this.milestone = milestone;
        this.programId = programId;
        this.targetCompletionDate = targetCompletionDate;
        this.assignedUserId = assignedUserId;
    }
}
