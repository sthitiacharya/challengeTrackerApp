import { Milestone } from './milestone';

export class CreateMilestoneReq {

    milestone: Milestone | undefined;
    programId: number | undefined | null;

    constructor(milestone?: Milestone, programId?: number | null)
    {
        this.milestone = milestone;
        this.programId = programId;
    }
}
