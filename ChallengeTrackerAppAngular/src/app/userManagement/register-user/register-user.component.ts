import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  submitted: boolean;
	newUser: User;
  resultSuccess: boolean;
	resultError: boolean;
	message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) 
  { 
    this.submitted = false;
    this.newUser = new User();
    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit(): void {
  }

  create(createUserForm: NgForm){
    this.submitted = true;
    if (createUserForm.invalid)
    {
      this.resultError = true;
      this.resultSuccess = false;
      this.message = "An error has occurred while creating the new user: ";
      console.log('********** CreateNewUserComponent.ts: ERROR*******');
    }
    this.userService.createNewUser(this.newUser).subscribe(
      response => {
        let newUserId: number = response;
        this.resultSuccess = true;
        this.resultError = false;
        this.message = "New User " + newUserId + " created successfully";
      },
      error => {
        this.resultError = true;
        this.resultSuccess = false;
        this.message = "An error has occurred while creating the new user: " + error;
        console.log(`********** CreateNewUserComponent.ts: ${error}`);
      }
    );
  }

}
