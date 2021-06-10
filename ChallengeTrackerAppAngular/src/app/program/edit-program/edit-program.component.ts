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

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit {
  submitted: boolean;
	programId: string | null;	
	programToUpdate: Program;
	retrieveProductError: boolean;

	milestoneIds: string[];
	milestones: Milestone[];

  userId: number | undefined;
  userIds: string[];
  users: User[];

  startDate: string | undefined | null;
	targetCompletionDate: string | undefined | null;
	
	resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private programService: ProgramService,
    private milestoneService: MilestoneService,
    private userService: UserService) { 

      this.programId = null;
      this.programToUpdate = new Program();
      
      this.milestoneIds = new Array();
      this.milestones = new Array();

      this.userIds = new Array();
      this.users = new Array();

      this.startDate = null;
      this.targetCompletionDate = null;

      this.submitted = false;
      this.retrieveProductError = false;
      
      this.resultSuccess = false;
      this.resultError = false;
  }

  ngOnInit(): void {
    this.programId = this.activatedRoute.snapshot.paramMap.get('programId');		
		
		if(this.programId == null)
		{
      return;
    }
		
    this.programService.getProgram(parseInt(this.programId)).subscribe(
      response => {
        this.programToUpdate = response;
      },
      error => {
        console.log('********** EditProgramComponent.ts: ' + error);
      }
    );
    
    this.milestoneService.getProgramMilestones(parseInt(this.programId)).subscribe(
      response => {
        this.milestones = response;
      },
      error => {
        console.log('********** EditProgramComponent.ts: ' + error);
      }
    );

    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.log('********** EditProgramComponent.ts: ' + error);
      }
    );
	}

  update(updateProgramForm: NgForm)
	{
    let longUserIds: number[] = new Array();
		
		for(var i = 0; i < this.userIds.length; i++)
		{
			longUserIds.push(parseInt(this.userIds[i]));
		}

		this.submitted = true;

    if (updateProgramForm.invalid)
    {
      this.resultError = true;
			this.resultSuccess = false;
      return;
    }

    this.programService.updateProgram(this.programToUpdate, this.userId, longUserIds, 
      this.startDate, this.targetCompletionDate).subscribe(
      response => {					
        this.resultSuccess = true;
        this.resultError = false;
        this.message = "Program updated successfully";
        this.router.navigate([`program/${this.programId}`]);
      },
      error => {
        this.resultError = true;
        this.resultSuccess = false;
        this.message = `An error has occurred while updating the program: ${error}`;
        
        console.log(`********** EditProgramComponent.ts: ${error}`);
      }
    );
	
	}

}
