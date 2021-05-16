import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { MilestoneService } from "../../services/milestone.service";
import { SessionService } from "../../services/session.service";
import { Milestone } from "../../models/milestone";

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

      this.resultSuccess = false;
      this.resultError = false;
     }

  ngOnInit(): void {
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
		if (createMilestoneForm.valid) 
		{
			this.milestoneService.createNewMilestone(this.newMilestone, this.programId, this.targetCompletionDate).subscribe(
				response => {
					let newMilestoneId: number = response;
					this.resultSuccess = true;
					this.resultError = false;
					this.message = "New milestone " + newMilestoneId + " created successfully";
				},
				error => {
					this.resultError = true;
					this.resultSuccess = false;
					this.message = "An error has occurred while creating the new program: " + error;
					
					console.log('********** CreateNewMilestoneComponent.ts: ' + error);
				}
			);
		}
	}
}
