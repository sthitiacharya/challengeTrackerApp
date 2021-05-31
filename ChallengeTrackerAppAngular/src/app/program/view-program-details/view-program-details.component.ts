import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from "../../services/session.service";
import { ProgramService } from "../../services/program.service";
import { MilestoneService } from "../../services/milestone.service";
import { Program } from "../../models/program";
import { Milestone } from "../../models/milestone";

@Component({
  selector: 'app-view-program-details',
  templateUrl: './view-program-details.component.html',
  styleUrls: ['./view-program-details.component.css']
})
export class ViewProgramDetailsComponent implements OnInit {
  programId: string | null;
  program: Program;
  milestones: Milestone[] | undefined;
  retrieveProgramError: boolean;
  displayedColumns: string[] = ['title', 'description', 'targetCompletionDate', 'milestoneType', 'valueType', 'initialValue', 'targetValue'];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
	  private sessionService: SessionService,
    private programService: ProgramService,
    private milestoneService: MilestoneService) { 
      this.programId = null;
      this.program = new Program();
      this.milestones = new Array();
      this.retrieveProgramError = false;
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
  }

}
