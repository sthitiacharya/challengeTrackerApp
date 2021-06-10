import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reward } from "../models/reward";
import { RewardsHistory } from "../models/rewards-history";
import { User } from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  baseUrl: string = "/api/Reward";

  constructor(private httpClient: HttpClient) { }

  getAllRewards() : Observable<Reward[]>
  {
    return this.httpClient.get<Reward[]>(`${this.baseUrl}/rewards`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getReward(rewardId?: number) : Observable<Reward>
  {
    return this.httpClient.get<Reward>(`${this.baseUrl}/rewards/${rewardId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  redeemReward(rewardId?: number, userId?: number) : Observable<number>
  {
    //let rewardHistory : RewardsHistory = new RewardsHistory(reward, user);
    return this.httpClient.post<number>(`${this.baseUrl}/redeemReward?rewardId=${rewardId}&userId=${userId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  viewRedeemedRewards(userId?: number) : Observable<Reward[]>
  {
    return this.httpClient.get<Reward[]>(`${this.baseUrl}/viewRedeemedRewards?userId=${userId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  viewRewardHistories(userId?: number) : Observable<RewardsHistory[]>
  {
    return this.httpClient.get<RewardsHistory[]>(`${this.baseUrl}/viewRewardsHistories?userId=${userId}`, httpOptions).pipe(
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
