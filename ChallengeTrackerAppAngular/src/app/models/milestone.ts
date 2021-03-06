import { Program } from "./program";
import { User } from "./user";
import { ProgressHistory } from "./progress-history";
import { ValueCategoryEnum } from "./value-category-enum.enum";
import { ReminderInterval } from "./reminder-interval.enum";

export class Milestone {
    milestoneId: number | undefined;
	title: string | undefined;
    description: string | undefined;
    milestoneType: string | undefined;
    valueCategory: ValueCategoryEnum | undefined;
    //valueCategory: string | undefined;
    valueType: string | undefined;
    initialValue: number | undefined;
    targetValue: number | undefined;
	creationDate: Date | undefined;
	targetCompletionDate: Date | undefined;
    actualCompletedDate: Date | undefined;
    rewardValue: number | undefined;
    reminderStartDate: Date | undefined;
    reminderInterval: String | undefined;
    program: Program | undefined;
    milestoneCreatedBy: User | undefined;
    assignedUser: User | undefined;
    progressHistories: ProgressHistory[] | undefined;

    constructor(milestoneId?: number, title?: string, description?: string, 
        milestoneType?: string, valueCategory?: ValueCategoryEnum, valueType?: string, initialValue?: number, targetValue?: number, 
        targetCompletionDate?: Date, rewardValue?: number, reminderStartDate?: Date, reminderInterval?: String)
	{
		this.milestoneId = milestoneId;		
		this.title = title;
		this.description = description;
        this.milestoneType = milestoneType;
        this.valueCategory = valueCategory;
        this.valueType = valueType;
        this.initialValue = initialValue;
        this.targetValue = targetValue;
		this.creationDate = new Date();
		this.targetCompletionDate = targetCompletionDate;
        this.rewardValue = rewardValue;
        this.reminderStartDate = reminderStartDate;
        this.reminderInterval = reminderInterval;
	}    

}
