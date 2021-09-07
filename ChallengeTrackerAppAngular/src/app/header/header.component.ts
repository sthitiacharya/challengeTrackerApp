import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  userLogout(): void {
    this.sessionService.setIsLogin(false); 
    this.router.navigate(['/index']);
  }
}
