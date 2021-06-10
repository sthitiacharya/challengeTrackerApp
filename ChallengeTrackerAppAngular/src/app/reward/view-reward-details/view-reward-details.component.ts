import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from "../../services/session.service";
import { Reward } from "../../models/reward";
import { RewardService } from "../../services/reward.service";

@Component({
  selector: 'app-view-reward-details',
  templateUrl: './view-reward-details.component.html',
  styleUrls: ['./view-reward-details.component.css']
})
export class ViewRewardDetailsComponent implements OnInit {
  rewardId: string | null;
  reward: Reward;
  retrieveRewardError: boolean;
  error: boolean;
  message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
	  private sessionService: SessionService,
    private rewardService: RewardService) 
    { 
      this.rewardId = null;
      this.reward = new Reward();
      this.retrieveRewardError = false;
      this.error = false;
    }

  ngOnInit(): void {
    this.rewardId = this.activatedRoute.snapshot.paramMap.get('rewardId');
    
    if (this.rewardId == null)
    {
      this.retrieveRewardError = true;
      return;
    }

    this.rewardService.getReward(parseInt(this.rewardId)).subscribe(
			response => {
				this.reward = response;
			},
			error => {
        this.retrieveRewardError = true;
				console.log('********** ViewProgramDetailsComponent.ts: ' + error);
			}
		);
  }

  redeemReward(rewardId?: number)
  {
    this.rewardService.redeemReward(rewardId, this.sessionService.getCurrentUser().userId).subscribe(
			response => {
        this.error = false;
        this.message = `Reward ${rewardId} redeemed successfully`;
				//this.router.navigate(['/redeemedRewards']);
			},
			error => {
        this.error = true;
        this.message = error;
				console.log('********** ViewProgramDetailsComponent.ts: ' + error);
			}
		);
  }

}
