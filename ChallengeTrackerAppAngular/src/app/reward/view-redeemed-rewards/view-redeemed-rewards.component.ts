import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RewardService } from '../../services/reward.service';
import { SessionService } from '../../services/session.service';
import { Reward } from '../../models/reward';
import { RewardsHistory } from '../../models/rewards-history';

@Component({
  selector: 'app-view-redeemed-rewards',
  templateUrl: './view-redeemed-rewards.component.html',
  styleUrls: ['./view-redeemed-rewards.component.css']
})
export class ViewRedeemedRewardsComponent implements OnInit {

  rewardHistories: RewardsHistory[];
  redeemedRewards: Reward[];

  constructor(private router : Router,
    private activatedRoute : ActivatedRoute,
    private sessionService : SessionService,
    private rewardService : RewardService) 
    { 
      this.rewardHistories = new Array();
      this.redeemedRewards = new Array();
    }

  ngOnInit(): void {
    this.rewardService.viewRewardHistories(this.sessionService.getCurrentUser().userId).subscribe
    (
      response =>
      {
        this.rewardHistories = response;
      },
      error =>
      {
        console.log(`******ViewRedeemedRewardsComponent.ts: ${error}`);
      }
    );

    this.rewardService.viewRedeemedRewards(this.sessionService.getCurrentUser().userId).subscribe
    (
      response =>
      {
        this.redeemedRewards = response;
      },
      error =>
      {
        console.log(`******ViewRedeemedRewardsComponent.ts: ${error}`);
      }
    )
  }

}
