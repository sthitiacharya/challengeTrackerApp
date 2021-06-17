import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../app/services/session.service';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = 'ChallengeTrackerAppAngular';
  user : User
  constructor(private router: Router,
    public sessionService: SessionService) {
      this.user = new User();
     }

  ngOnInit(): void {
    this.user = this.sessionService.getCurrentUser();
  }

  userLogout(): void {
    this.sessionService.setIsLogin(false); 
    this.router.navigate(['/login']);
  }
}
