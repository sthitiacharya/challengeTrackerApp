import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { MilestoneService } from "../../services/milestone.service";
import { SessionService } from "../../services/session.service";
import { Milestone } from "../../models/milestone";
import { ValueCategoryEnum } from "../../models/value-category-enum.enum";

@Component({
  selector: 'app-create-new-milestone',
  templateUrl: './create-new-milestone.component.html',
  styleUrls: ['./create-new-milestone.component.css']
})
export class CreateNewMilestoneComponent implements OnInit {
  	submitted: boolean;
	newMilestone: Milestone;
	programId: number | null;
	targetCompletionDate: string | undefined;
	valueCategoryEnum = ValueCategoryEnum;
	public valueCategories = Object.values(this.valueCategoryEnum).filter(value => typeof value === 'string');
	//valueCategories = ["Health", "Career", "Finance", "Education"];
	valueTypes = new Array();
	healthValueType = ["Weight (kgs)", "Weight (pounds)", "No. of steps / day", "Walking distance (km)",
	 "Walking distance (miles)", "Hours of sleep", "Hours of Screen Time", "Calorie intake"];
	careerValueType = ["Work hours / day", "No. of certificates completed"];
	financeValueType = ["Amount Saved", "Expenditure Amount", "Amount Invested"];
	educationValueType = ["No. of hours studied / day", "No. of books read / day", "No. of assignments completed", "No. of courses completed"];
	resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private milestoneService: MilestoneService,
	private sessionService: SessionService) {
      this.submitted = false;
      this.newMilestone = new Milestone();
      this.programId = null;
	  //this.valueCategories = new Array();
      this.resultSuccess = false;
      this.resultError = false;
     }

  ngOnInit(): void {
	  if (this.newMilestone.valueCategory == 'Health')
	  {
		  this.valueTypes = this.healthValueType;
	  }
	  if (this.newMilestone.valueCategory == 'Career')
	  {
		  this.valueTypes = this.careerValueType;
	  }
	  if (this.newMilestone.valueCategory == 'Finance')
	  {
		  this.valueTypes = this.financeValueType;
	  }
	  if (this.newMilestone.valueCategory == 'Education')
	  {
		  this.valueTypes = this.educationValueType;
	  }
  }

  create(createMilestoneForm: NgForm)
	{	
		this.submitted = true;
		let progId = this.milestoneService.getProgramId();
		if (progId != null)
		{
			this.programId = progId;
		}
		this.newMilestone.milestoneCreatedBy = this.sessionService.getCurrentUser();
		if (createMilestoneForm.invalid)
		{
			this.resultError = true;
			this.resultSuccess = false;
			this.message = "An error has occurred while creating the new milestone";
			console.log('********** CreateNewMilestoneComponent.ts: ERROR **********');
		}
		this.milestoneService.createNewMilestone(this.newMilestone, this.programId, this.targetCompletionDate).subscribe(
			response => {
				let newMilestoneId: number = response;
				this.resultSuccess = true;
				this.resultError = false;
				this.message = "New milestone " + newMilestoneId + " created successfully";
				this.router.navigate(['/dashboard']);
			},
			error => {
				this.resultError = true;
				this.resultSuccess = false;
				this.message = "An error has occurred while creating the new program: " + error;
				
				console.log(`********** CreateNewMilestoneComponent.ts: ${error}`);
			}
		);		
	}
}
