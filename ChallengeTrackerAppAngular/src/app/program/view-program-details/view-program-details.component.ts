import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirmDialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { SessionService } from "../../services/session.service";
import { ProgramService } from "../../services/program.service";
import { MilestoneService } from "../../services/milestone.service";
import { Program } from "../../models/program";
import { Milestone } from "../../models/milestone";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-program-details',
  templateUrl: './view-program-details.component.html',
  styleUrls: ['./view-program-details.component.css']
})
export class ViewProgramDetailsComponent implements OnInit {
  
  programId: string | null;
  program: Program;
  milestones: Milestone[] | undefined;

  programManager: User | undefined;
  retrieveProgramError: boolean;
  isProgramManager: boolean;

  error: boolean;
  errorMessage: string | undefined;


  displayedColumns: string[] = ['title', 'description', 'targetCompletionDate', 'milestoneType', 'valueType', 'initialValue', 'targetValue'];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog : MatDialog,
	  private sessionService: SessionService,
    private programService: ProgramService,
    private milestoneService: MilestoneService) { 
      this.programId = null;
      this.program = new Program();
      this.milestones = new Array();
      this.retrieveProgramError = false;
      this.error = false;
      this.isProgramManager = false;
      this.programManager = new User();
    }

  ngOnInit(): void {

    this.programId = this.activatedRoute.snapshot.paramMap.get('programId');
    
    if (this.programId == null)
    {
      this.retrieveProgramError = true;
      return;
    }

    this.programService.getProgram(parseInt(this.programId)).subscribe(
			response => {
				this.program = response;
        this.programManager = this.program.programManager;

        if (this.programManager == this.sessionService.getCurrentUser())
        {
          this.isProgramManager = true;
        }
			},
			error => {
				console.log('********** ViewProgramDetailsComponent.ts: ' + error);
			}
		);

    this.milestoneService.getProgramMilestones(parseInt(this.programId)).subscribe(
			response => {
				this.milestones = response;
			},
			error => {
				console.log('********** ViewProgramDetailsComponent.ts: ' + error);
			}
		);

    this.milestoneService.setProgramId(parseInt(this.programId));
  }

  deleteProgram()
  {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Program Confirmation',
        message: 'Are you sure you want to remove this program?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      if (this.programId == null)
      {
        this.retrieveProgramError = true;
        return;
      }
      this.programService.deleteProgram(parseInt(this.programId)).subscribe(
        response => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.error = true;
          this.errorMessage = error;
          console.log('********** ViewProgramDetailsComponent.ts: ' + error);
        }
      );
    });
  }

  deleteMilestone(milestoneId?: number)
  {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Milestone Confirmation',
        message: 'Are you sure you want to remove this milestone?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      if (milestoneId == null)
      {
        return;
      }
      this.milestoneService.deleteMilestone(milestoneId).subscribe(
        response => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.error = true;
          this.errorMessage = error;
          console.log('********** ViewProgramDetailsComponent.ts: ' + error);
        }
      );
    });
  }
}
