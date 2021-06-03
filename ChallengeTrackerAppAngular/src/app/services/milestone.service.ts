import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreateMilestoneReq } from "../models/create-milestone-req";
import { UpdateMilestoneReq } from "../models/update-milestone-req";
import { Milestone } from "../models/milestone";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  baseUrl: string = "/api/Milestone";
  programId: number | undefined | null;

  constructor(private httpClient : HttpClient) { }

  createNewMilestone(milestone?: Milestone, programId?: number | null, targetCompletionDate?: string): Observable<number>
  {		
    let createMilestoneReq: CreateMilestoneReq = new CreateMilestoneReq(milestone, programId, targetCompletionDate);

    return this.httpClient.post<number>(this.baseUrl + "/createMilestone", createMilestoneReq, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  getProgramMilestones(programId?: number | null) : Observable<Milestone[]>
  {
    return this.httpClient.get<Milestone[]>(this.baseUrl + `/getProgramMilestones?programId=${programId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateMilestone(milestone?: Milestone, programId?: number | null, targetCompletionDate?: string): Observable<number>
  {		
    let updateMilestoneReq: UpdateMilestoneReq = new UpdateMilestoneReq(milestone, programId, targetCompletionDate);

    return this.httpClient.put<number>(this.baseUrl + "/editMilestone", updateMilestoneReq, httpOptions).pipe
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

  setProgramId(programId?: number | null)
  {
    this.programId = programId;
  }

  getProgramId()
  {
    return this.programId;
  }
}
