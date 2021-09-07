import { Program } from "./program";

export class UpdateProgramReq {
    program: Program | undefined;
    userId: number | undefined | null;
    userIds: number[] | undefined;

    userLoggedIn: number | undefined | null;

    startDate: string | undefined | null;
    targetCompletionDate: string | undefined | null;

    constructor(program?: Program, userId?: number | null, userIds?: number[], startDate?: string | null,
         targetCompletionDate?: string | null, userLoggedIn?: number | null)
    {
        this.program = program;
        this.userId = userId;
        this.userIds = userIds;
        this.startDate = startDate;
        this.targetCompletionDate = targetCompletionDate;
        this.userLoggedIn = userLoggedIn;
    }
}
