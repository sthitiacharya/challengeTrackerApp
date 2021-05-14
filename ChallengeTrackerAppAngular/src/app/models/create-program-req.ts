import { Program } from "./program";
import { User } from "./user";

export class CreateProgramReq {

    program: Program | undefined;
    userId: number | undefined | null;
    userIds: number[] | undefined;

    startDate: string | undefined | null;
    targetCompletionDate: string | undefined | null;

    constructor(program?: Program, userId?: number | null, userIds?: number[], startDate?: string | null, targetCompletionDate?: string | null)
    {
        this.program = program;
        this.userId = userId;
        this.userIds = userIds;
        this.startDate = startDate;
        this.targetCompletionDate = targetCompletionDate;
    }
}
