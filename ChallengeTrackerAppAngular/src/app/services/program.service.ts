import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from "../services/session.service";
import { CreateProgramReq } from "../models/create-program-req";
import { UpdateProgramReq } from "../models/update-program-req";
import { Program } from "../models/program";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
	baseUrl: string = "/api/Program";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService)
  { 
  }

  createNewProgram(program?: Program, userId?: number | null, userIds?: number[], startDate?: string | null, targetCompletionDate?: string | null): Observable<number>
  {		
    let createProgReq: CreateProgramReq = new CreateProgramReq(program, userId, userIds, startDate, targetCompletionDate);

    return this.httpClient.post<number>(this.baseUrl + "/createProgram", createProgReq, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }
	
  getEnrolledPrograms(userId?: number | null): Observable<Program[]>
  {		
    return this.httpClient.get<Program[]>(this.baseUrl + `/getEnrolledPrograms?userId=${userId}`, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  getProgram(programId?: number): Observable<Program>
  {
    return this.httpClient.get<Program>(this.baseUrl + `/getEnrolledPrograms/${programId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateProgram(program?: Program, userId?: number | null, userIds?: number[], startDate?: string | null, targetCompletionDate?: string | null): Observable<number>
  {		
    let updateProgReq: UpdateProgramReq = new UpdateProgramReq(program, userId, userIds, startDate, 
      targetCompletionDate, this.sessionService.getCurrentUser().userId);

    return this.httpClient.put<number>(`${this.baseUrl}/editProgram`, updateProgReq, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  deleteProgram(programId?: number): Observable<any>
  {
    return this.httpClient.delete<any>(this.baseUrl + `/deleteProgram/${programId}`, httpOptions).pipe(
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
