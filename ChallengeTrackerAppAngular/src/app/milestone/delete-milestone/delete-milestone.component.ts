import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from "../../services/session.service";
import { MilestoneService } from "../../services/milestone.service";
import { Milestone } from "../../models/milestone";

@Component({
  selector: 'app-delete-milestone',
  templateUrl: './delete-milestone.component.html',
  styleUrls: ['./delete-milestone.component.css']
})
export class DeleteMilestoneComponent implements OnInit {
  milestoneId: string | null;
  programId: string | null;
  milestoneToDelete: Milestone;
  error: boolean;
	errorMessage: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private milestoneService: MilestoneService) 
  {
    this.milestoneId = null;
    this.programId = null;
    this.milestoneToDelete = new Milestone();
    this.error = false;
  }

  ngOnInit(): void {
    this.milestoneId = this.activatedRoute.snapshot.paramMap.get('milestoneId');
    this.programId = this.activatedRoute.snapshot.paramMap.get('programId');

    if (this.milestoneId == null)
    {
      this.error = true;
      return;
    }

    this.milestoneService.getMilestone(parseInt(this.milestoneId)).subscribe(
      response => {
        this.milestoneToDelete = response;
        this.error = false;
      },
      error => {
        this.error = true;
        this.errorMessage = error;
        this.milestoneToDelete = new Milestone();
        console.log('********** DeleteProductComponent.ts: ' + error);
      }
    );
  }

  deleteMilestone()
  {
    if (this.milestoneId == null)
    {
      this.error = true;
      return;
    }

    this.milestoneService.deleteMilestone(parseInt(this.milestoneId)).subscribe(
      response => {
        this.router.navigate(["/dashboard"]);
        this.error = false;
      },
      error => {
        this.error = true;
        this.errorMessage = error;
      }
    );
  }
}
