import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { LoginReq } from '../models/login-req';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "/api/User";

  constructor(private httpClient: HttpClient) { }

  createNewUser(newUser: User): Observable<number> {
    //newUser.authbody = window.btoa(newUser.username + ":" + newUser.password);
    return this.httpClient.post<number>(this.baseUrl + "/register", newUser, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  //userLogin(username: string | undefined, password: string | undefined): Observable<User> {
  //  return this.httpClient.get<User>(this.baseUrl + '/userLogin?username=' + username +
  //   '&password=' + password).pipe(catchError(this.handleError));
  //}

  userLogin(username: string | undefined , password: string | undefined): Observable<User> {
    console.log(`${username} ${password}`);
    let loginReq : LoginReq = new LoginReq(username, password);
    const httpHeaders = { headers: new HttpHeaders({"Authorization": `Basic ${btoa(`${username}:${password}`)}`}) };
    //httpOptions.headers.append('Authorization', `Basic ${username}:${password}`);
    console.log("test");
    console.log(JSON.stringify(httpHeaders.headers.getAll('Authorization')));
    return this.httpClient.post<User>(this.baseUrl + "/login", loginReq, httpHeaders)
    .pipe(
      catchError(this.handleError));
  }

  getUsers(): Observable<User[]>
  {				
    return this.httpClient.get<User[]>(this.baseUrl + "/retrieveAllUsers").pipe
    (
      catchError(this.handleError)
    );
  }

  getProgramUsers(programId?: number | null): Observable<User[]>
  {				
    return this.httpClient.get<User[]>(`${this.baseUrl}/retrieveProgramUsers/${programId}`).pipe
    (
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse)
  {
    let errorMessage: string = "";
    
    if (error.error instanceof ErrorEvent) 
    {		
      errorMessage = "An unknown error has occurred: " + error.error;
    } 
    else 
    {		
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }
    
    console.error(errorMessage);
    
    return throwError(errorMessage);		
  }
}
