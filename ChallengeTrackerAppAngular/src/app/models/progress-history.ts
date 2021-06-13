import { Milestone } from "./milestone";
import { Program } from "./program";

export class ProgressHistory {
    progressHistoryId: number | undefined;
    milestoneId : Milestone | undefined;
    programId: Program | undefined;
    dateOfRecord: Date | undefined;
    value: number | undefined;

    constructor(milestoneId?: Milestone, programId?: Program, dateOfRecord?: Date, value?: number)
    {
        this.milestoneId = milestoneId;
        this.dateOfRecord = dateOfRecord;
        this.programId = programId;
        this.value = value;
    }
}
