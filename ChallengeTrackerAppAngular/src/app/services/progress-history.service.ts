import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProgressHistory } from "../models/progress-history";
import { CreateProgHistoryReq } from "../models/create-prog-history-req";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProgressHistoryService {

  baseUrl: string = "/api/ProgressHistory";

  constructor(private httpClient : HttpClient) { }

  createProgressHistory(progressHistory?: ProgressHistory, milestoneId?: number): Observable<number>
  {		
    let createProgHistoryReq: CreateProgHistoryReq = new CreateProgHistoryReq(progressHistory, milestoneId);
    return this.httpClient.post<number>(this.baseUrl + "/logProgress", createProgHistoryReq, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }
	
  viewProgressHistories(milestoneId?: number | null): Observable<ProgressHistory[]>
  {		
    return this.httpClient.get<ProgressHistory[]>(this.baseUrl + `/progressHistories/${milestoneId}`, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  retrieveProgressHistory(progressHistoryId?: number | null)
  {
    return this.httpClient.get<ProgressHistory>(`${this.baseUrl}/progressHistory/${progressHistoryId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  updateProgressHistory(progressHistory?: ProgressHistory): Observable<number>
  {		
    return this.httpClient.put<number>(`${this.baseUrl}/editProgressHistory`, progressHistory, httpOptions).pipe
    (
      catchError(this.handleError)
    );
  }

  deleteProgressHistory(progressHistoryId?: number): Observable<any>
  {
    return this.httpClient.delete<any>(`${this.baseUrl}/deleteProgressHistory/${progressHistoryId}`, httpOptions).pipe
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
