import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ProgramService } from "../../services/program.service";
import { UserService } from "../../services/user.service";
import { MilestoneService } from "../../services/milestone.service";
import { SessionService } from "../../services/session.service";
import { Program } from "../../models/program";
import { User } from "../../models/user";

@Component({
  selector: 'app-create-new-program',
  templateUrl: './create-new-program.component.html',
  styleUrls: ['./create-new-program.component.css']
})
export class CreateNewProgramComponent implements OnInit {
	submitted: boolean;
	newProgram: Program;
	programManager: number | undefined;
	userIds: string[];
	startDate: string | undefined | null;
	targetCompletionDate: string | undefined | null;

	users: User[];

	resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private programService: ProgramService,
              private userService: UserService,
			  private milestoneService: MilestoneService,
			  private sessionService: SessionService) { 

    this.submitted = false;
    this.newProgram = new Program();
    this.userIds = new Array();
    this.users = new Array();
	this.startDate = null;
	this.targetCompletionDate = null;
    this.resultSuccess = false;
	this.resultError = false;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
			response => {
				this.users = response;
			},
			error => {
				console.log('********** CreateNewProgramComponent.ts: ' + error);
			}
		);
  }

  create(createProgramForm: NgForm)
	{	
		let longUserIds: number[] = new Array();
		
		for(var i = 0; i < this.userIds.length; i++)
		{
			longUserIds.push(parseInt(this.userIds[i]));
		}			
	
		this.submitted = true;

		//let startDateString: string = this.parseDate(this.startDate);
		//let targetDateString: string = this.parseDate(this.targetCompletionDate);
		this.programManager = this.sessionService.getCurrentUser().userId;
		if (createProgramForm.valid) 
		{
			this.programService.createNewProgram(this.newProgram, this.programManager, longUserIds, this.startDate, this.targetCompletionDate).subscribe(
				response => {
					let newProgramId: number = response;
					this.milestoneService.setProgramId(newProgramId);
					this.resultSuccess = true;
					this.resultError = false;
					this.message = "New program " + newProgramId + " created successfully";
					this.router.navigate(['/milestone/createMilestone']);
				},
				error => {
					this.resultError = true;
					this.resultSuccess = false;
					this.message = "An error has occurred while creating the new program: " + error;
					
					console.log('********** CreateNewProgramComponent.ts: ' + error);
				}
			);
		}
	}

	parseDate(d: Date | undefined | null)
	{		
		if(d != null)
		{
			return d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
		}
		else
		{
			return '';
		}
	}
}
