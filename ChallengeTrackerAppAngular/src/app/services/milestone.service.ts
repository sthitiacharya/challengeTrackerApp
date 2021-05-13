import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreateMilestoneReq } from "../models/create-milestone-req";
import { Milestone } from "../models/milestone";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  baseUrl: string = "/api/Milestone";
  constructor(private httpClient : HttpClient) { }

  createNewMilestone(milestone?: Milestone, programId?: number | null): Observable<number>
  {		
    let createMilestoneReq: CreateMilestoneReq = new CreateMilestoneReq(milestone, programId);

    return this.httpClient.put<number>(this.baseUrl, createMilestoneReq, httpOptions).pipe
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
