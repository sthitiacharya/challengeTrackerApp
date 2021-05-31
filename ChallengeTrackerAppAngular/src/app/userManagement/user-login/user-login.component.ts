import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {
  @Output()
  childEvent = new EventEmitter();

  username: string | undefined;
  password: string | undefined;
  loginError: boolean;
  errorMessage: string | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private userService: UserService
  ) {
    this.loginError = false;
  }

  ngOnInit() : void {
  }

  parentEvent() {}

  userLogin(): void {
    this.sessionService.setUsername(this.username);
    this.sessionService.setPassword(this.password);

    this.userService.userLogin(this.username, this.password).subscribe(
      (response: any) => {
        let user: User = response;

        if (user == null)
        {
          this.loginError = true;
          return;
        }
        this.sessionService.setIsLogin(true);
        this.sessionService.setCurrentUser(user);
        this.loginError = false;

        this.childEvent.emit();

        this.router.navigate(['/login']);
      },
      (error: string | undefined) => {
        this.loginError = true;
        this.errorMessage = error;
      }
    );
  }

  userLogout(): void {
    this.sessionService.setIsLogin(false); 
    this.router.navigate(['/login']);
  }

}
