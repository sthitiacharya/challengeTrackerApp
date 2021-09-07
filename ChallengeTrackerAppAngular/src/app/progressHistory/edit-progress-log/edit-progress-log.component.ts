import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from "../../services/session.service";
import { ProgressHistoryService } from "../../services/progress-history.service";
import { ProgressHistory } from "../../models/progress-history";

@Component({
  selector: 'app-edit-progress-log',
  templateUrl: './edit-progress-log.component.html',
  styleUrls: ['./edit-progress-log.component.css']
})
export class EditProgressLogComponent implements OnInit {

  submitted: boolean;
  progressHistoryId: string | null;
  progressHistory: ProgressHistory;

  retrieveProgressHistoryError: boolean;

  resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
	  private sessionService: SessionService,
    private progressHistoryService: ProgressHistoryService) 
    {
      this.progressHistoryId = null;
      this.progressHistory = new ProgressHistory();

      this.submitted = false;
      this.retrieveProgressHistoryError = false;
      this.resultError = false;
      this.resultSuccess = false;
    }

  ngOnInit(): void {
    this.progressHistoryId = this.activatedRoute.snapshot.paramMap.get('progressHistoryId');

    if (this.progressHistoryId == null)
    {
      this.retrieveProgressHistoryError = true;
      return;
    }

    this.progressHistoryService.retrieveProgressHistory(parseInt(this.progressHistoryId)).subscribe(
			response => {
				this.progressHistory = response;
			},
			error => {
				console.log('********** ViewMilestoneDetailsComponent.ts: ' + error);
			}
		);
  }

  update(updateProgHistoryForm: NgForm)
	{
		this.submitted = true;

    if (updateProgHistoryForm.invalid)
    {
      this.resultError = true;
			this.resultSuccess = false;
      return;
    }

    this.progressHistoryService.updateProgressHistory(this.progressHistory).subscribe(
      response => {					
        this.resultSuccess = true;
        this.resultError = false;
        this.message = "Progress log updated successfully";
      },
      error => {
        this.resultError = true;
        this.resultSuccess = false;
        this.message = `An error has occurred while updating the milestone: ${error}`;
        
        console.log(`********** EditProgLogComponent.ts: ${error}`);
      }
    );
	
	}

}
