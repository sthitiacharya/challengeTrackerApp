import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../app/services/session.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = 'ChallengeTrackerAppAngular';
  constructor(private router: Router,
    public sessionService: SessionService) { }

  ngOnInit(): void {
  }

  userLogout(): void {
    this.sessionService.setIsLogin(false); 
    this.router.navigate(['/index']);
  }
}
