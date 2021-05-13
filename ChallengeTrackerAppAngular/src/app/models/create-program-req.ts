import { Program } from "./program";
import { User } from "./user";

export class CreateProgramReq {

    program: Program | undefined;
    userId: number | undefined | null;
    userIds: number[] | undefined;

    constructor(program?: Program, userId?: number | null, userIds?: number[])
    {
        this.program = program;
        this.userId = userId;
        this.userIds = userIds;
    }
}
