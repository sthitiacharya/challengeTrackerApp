import { Program } from "./program";

export class User {
    userId: number | undefined;
	email: string | undefined;
    mailingAddress: string | undefined;
	username: string | undefined;
	password: string | undefined;
	rewardPoints: number | undefined;
	enrolledPrograms: Program[] | undefined;
    programsManaging: Program[] | undefined;
	//authbody: string | undefined;
	
	constructor(userId?: number, email?: string, mailingAddress?: string, username?: string, password?: string)
	{
		this.userId = userId;		
		this.email = email;
		this.mailingAddress = mailingAddress;
		this.username = username;
		this.password = password;
	}
}
