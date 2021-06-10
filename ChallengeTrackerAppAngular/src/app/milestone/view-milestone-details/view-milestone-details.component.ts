import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from "../../services/session.service";
import { MilestoneService } from "../../services/milestone.service";
import { ProgressHistoryService } from "../../services/progress-history.service";
import { Program } from "../../models/program";
import { Milestone } from "../../models/milestone";
import { ProgressHistory } from "../../models/progress-history";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-milestone-details',
  templateUrl: './view-milestone-details.component.html',
  styleUrls: ['./view-milestone-details.component.css']
})
export class ViewMilestoneDetailsComponent implements OnInit {

  programId: number | null | undefined;
  milestoneId: string | null;
  milestone: Milestone;
  progressHistories: ProgressHistory[] | undefined;

  programManager: User | undefined;
  retrieveMilestoneError: boolean;

  error: boolean;
  errorMessage: string | undefined;
  displayedColumns: string[] = ['Log Date', 'Value', 'Action'];
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
	  private sessionService: SessionService,
    private progressHistoryService: ProgressHistoryService,
    private milestoneService: MilestoneService) {
      this.milestoneId = null;
      this.milestone = new Milestone();
      this.progressHistories = new Array();
      this.retrieveMilestoneError = false;
      this.error = false;
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
			error => {
				console.log('********** ViewMilestoneDetailsComponent.ts: ' + error);
			}
		);

    this.progressHistoryService.viewProgressHistories(parseInt(this.milestoneId)).subscribe(
			response => {
				this.progressHistories = response;
			},
			error => {
				console.log('********** ViewMilestoneDetailsComponent.ts: ' + error);
			}
		);

    this.programId = this.milestoneService.getProgramId();
  }

  deleteProgressHistory(progressHistoryId?: number)
  {
    this.progressHistoryService.deleteProgressHistory(progressHistoryId).subscribe(
      response =>
      {
        this.router.navigate([`/milestone/${this.milestoneId}`]);
      },
      error => {
        this.error = true;
				this.errorMessage = error;
      }
    )
  }
}
