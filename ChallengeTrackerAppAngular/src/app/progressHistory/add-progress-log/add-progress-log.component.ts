import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProgressHistory } from '../../models/progress-history';
import { Milestone } from '../../models/milestone';

import { ProgressHistoryService } from "../../services/progress-history.service";
import { MilestoneService } from "../../services/milestone.service";

@Component({
  selector: 'app-add-progress-log',
  templateUrl: './add-progress-log.component.html',
  styleUrls: ['./add-progress-log.component.css']
})
export class AddProgressLogComponent implements OnInit {

  submitted: boolean;
  milestoneId: string | null | undefined;
  programId: number | null | undefined;
  milestone: Milestone;
	newLog: ProgressHistory;

  retrieveMilestoneError: boolean;
	resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private progressHistoryService: ProgressHistoryService,
    private milestoneService: MilestoneService) {
      this.submitted = false;
      this.milestoneId = null;
      this.milestone = new Milestone();
      this.newLog = new ProgressHistory();
      this.retrieveMilestoneError = false;
      this.resultSuccess = false;
	    this.resultError = false;
  }

  ngOnInit(): void {
    this.milestoneId = this.activatedRoute.snapshot.paramMap.get('milestoneId');

    if (this.milestoneId == null)
    {
      this.retrieveMilestoneError = true;
      return;
    }

    this.milestoneService.getMilestone(parseInt(this.milestoneId)).subscribe(
      response => {
        this.milestone = response;
      },
      error =>
      {
        console.log('********** AddProgressLogComponent.ts: ' + error);
      }
      
    )

    this.programId = this.milestoneService.getProgramId();
  }

  create(createProgressHistoryForm: NgForm) {	
		this.submitted = true;
		if (createProgressHistoryForm.invalid)
		{
			this.resultError = true;
			this.resultSuccess = false;
			this.message = "An error has occurred while creating the new progress history log";
			
			console.log('********** AddProgressLogComponent.ts: error');
		}
    if (this.milestoneId == null)
    {
      this.resultError = true;
			this.resultSuccess = false;
			this.message = "An error has occurred while creating the new progress history log";
      return;
    }
		this.progressHistoryService.createProgressHistory(this.newLog, parseInt(this.milestoneId)).subscribe(
			response => {
				let newProgressHistoryId: number = response;
				this.resultSuccess = true;
				this.resultError = false;
				this.message = "New program " + newProgressHistoryId + " created successfully";
				this.router.navigate([`/program/${this.programId}`]);
			},
			error => {
				this.resultError = true;
				this.resultSuccess = false;
				this.message = "An error has occurred while logging the progress: " + error;
				
				console.log(`********** AddProgressLogComponent.ts: ${error}`);
			}
		);
	}
}
