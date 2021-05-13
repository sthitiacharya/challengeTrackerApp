import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreateProgramReq } from "../models/create-program-req";
import { Program } from "../models/program";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
	baseUrl: string = "/api/Program";
  constructor(private httpClient: HttpClient)
  { 
  }

  createNewProgram(program?: Program, userId?: number | null, userIds?: number[]): Observable<number>
  {		
    let createProgReq: CreateProgramReq = new CreateProgramReq(program, userId, userIds);

    return this.httpClient.put<number>(this.baseUrl, createProgReq, httpOptions).pipe
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