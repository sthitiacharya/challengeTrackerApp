import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MilestoneService } from "../../services/milestone.service";
import { SessionService } from "../../services/session.service";
import { Milestone } from "../../models/milestone";

@Component({
  selector: 'app-view-reminders',
  templateUrl: './view-reminders.component.html',
  styleUrls: ['./view-reminders.component.css']
})
export class ViewRemindersComponent implements OnInit {
  reminders: string[];
  resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
	  private sessionService: SessionService,
    private milestoneService: MilestoneService) 
    { 
      this.reminders = new Array();
      this.resultError = false;
      this.resultSuccess = false;
    }

  ngOnInit(): void {
    this.milestoneService.getReminders(this.sessionService.getCurrentUser().userId).subscribe(
      response => {
        this.reminders = response;
        console.log(`****ViewRemindersComponent.ts****: ${response}`);
      },
      error => {
        this.resultError = true;
        this.resultSuccess = false;
        console.log(`******ViewRemindersComponent.ts******: ${error}`);
      }
    )
  }

  dismiss(reminder?: string)
  {
    this.reminders.forEach((element, index) => {
      if (element == reminder) {
        delete this.reminders[index];
      }
    });
  }

}
