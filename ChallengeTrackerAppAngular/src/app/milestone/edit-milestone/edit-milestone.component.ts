import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../../services/session.service';
import { ProgramService } from '../../services/program.service';
import { MilestoneService } from '../../services/milestone.service';
import { UserService } from '../../services/user.service';

import { Program } from '../../models/program';
import { Milestone } from 'src/app/models/milestone';
import { User } from '../../models/user';
import { ValueCategoryEnum } from "../../models/value-category-enum.enum";

@Component({
  selector: 'app-edit-milestone',
  templateUrl: './edit-milestone.component.html',
  styleUrls: ['./edit-milestone.component.css']
})
export class EditMilestoneComponent implements OnInit {
  submitted: boolean;
  programId: number | null | undefined;
	milestoneId: string | null;	
	milestoneToUpdate: Milestone;
	retrieveMilestoneError: boolean;
  valueCategoryEnum = ValueCategoryEnum;
	public valueCategories = Object.values(this.valueCategoryEnum).filter(value => typeof value === 'string');
	//valueCategories = ["Health", "Career", "Finance", "Education"];
	valueTypes = new Array();
  reminderIntervals = ["Daily", "Every 3 days", "Every 5 days", "Weekly", "None"];
	healthValueType = ["Weight (kgs)", "Weight (pounds)", "No. of steps / day", "Walking distance (km)",
	 "Walking distance (miles)", "Hours of sleep", "Hours of Screen Time", "Calorie intake"];
	careerValueType = ["Work hours / day", "No. of certificates completed"];
	financeValueType = ["Amount Saved", "Expenditure Amount", "Amount Invested"];
	educationValueType = ["No. of hours studied / day", "No. of books read / day", "No. of assignments completed", "No. of courses completed"];
	
  targetCompletionDate: string | undefined;
	
	resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private milestoneService: MilestoneService,
	private sessionService: SessionService) {
      this.submitted = false;
      this.milestoneToUpdate = new Milestone();

      this.milestoneId = null;
      this.programId = null;

      this.retrieveMilestoneError = false;
      this.resultSuccess = false;
      this.resultError = false;
   }

  ngOnInit(): void {
    this.milestoneId = this.activatedRoute.snapshot.paramMap.get('milestoneId');
    
    console.log('********** Milestone ID: ' + this.milestoneId);		
		
		if(this.milestoneId == null)
		{
      this.retrieveMilestoneError = true;
      return;
    }

    this.milestoneService.getMilestone(parseInt(this.milestoneId)).subscribe(
      response => {
        this.milestoneToUpdate = response;
        //this.programId = this.milestoneToUpdate.program?.programId;
        console.log('********** Milestone: ' + this.milestoneToUpdate);
      },
      error => {
        this.retrieveMilestoneError = true;
        console.log('********** EditMilestoneComponent.ts: ' + error);
      }
    );

    this.programId = this.milestoneService.getProgramId();
    console.log(`Program ID: ${this.programId}`);
    
	}
  
  update(updateMilestoneForm: NgForm)
	{
		this.submitted = true;
    //this.programId = this.milestoneToUpdate.program?.programId;

    if (updateMilestoneForm.invalid)
    {
      this.resultError = true;
			this.resultSuccess = false;
      return;
    }

    this.milestoneService.updateMilestone(this.milestoneToUpdate, this.programId, this.targetCompletionDate).subscribe(
      response => {					
        this.resultSuccess = true;
        this.resultError = false;
        this.message = "Milestone updated successfully";
        this.router.navigate([`program/${this.programId}`]);
      },
      error => {
        this.resultError = true;
        this.resultSuccess = false;
        this.message = `An error has occurred while updating the milestone: ${error}`;
        
        console.log(`********** EditMilestoneComponent.ts: ${error}`);
      }
    );
	
	}

}
