import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from "../../services/session.service";
import { ProgramService } from "../../services/program.service";
import { Program } from "../../models/program";

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.css']
})
export class ViewDashboardComponent implements OnInit {
  submitted: boolean;
  enrolledPrograms: Program[] | undefined
  username: string | undefined;
  resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
	  private sessionService: SessionService,
    private programService: ProgramService) {
      this.submitted = false;
      this.enrolledPrograms = new Array();

      this.resultSuccess = false;
      this.resultError = false;
     }

  ngOnInit(): void {
    this.programService.getEnrolledPrograms(this.sessionService.getCurrentUser().userId).subscribe(
			response => {
				this.enrolledPrograms = response;
			},
			error => {
				console.log('********** ViewAllProductsComponent.ts: ' + error);
			}
		);
    console.log(this.enrolledPrograms);
    this.username = this.sessionService.getUsername();
  }

}
