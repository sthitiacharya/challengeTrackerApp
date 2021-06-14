import { User } from "./user";

export class Program {
    programId: number | undefined;
	title: string | undefined;
    description: string | undefined;
	startDate: string | undefined;
	targetCompletionDate: Date | undefined;
	actualCompletedDate: Date | undefined;
	currentProgressRate: number | undefined;
	programManager: User | undefined;
    users: User[] | undefined;
	
	
	constructor(programId?: number, title?: string, description?: string, startDate?: string, targetCompletionDate?: Date)
	{
		this.programId = programId;		
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.targetCompletionDate = targetCompletionDate;
	}
}
