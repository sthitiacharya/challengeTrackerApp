import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RewardService } from '../../services/reward.service';
import { Reward } from '../../models/reward';

@Component({
  selector: 'app-view-all-rewards',
  templateUrl: './view-all-rewards.component.html',
  styleUrls: ['./view-all-rewards.component.css']
})
export class ViewAllRewardsComponent implements OnInit {
  rewards : Reward[];

  constructor(private router : Router,
    private activatedRoute : ActivatedRoute,
    private rewardService : RewardService) 
    { 
      this.rewards = new Array();
    }

  ngOnInit(): void {
    this.rewardService.getAllRewards().subscribe(
			response => {
				this.rewards = response;
			},
			error => {
				console.log('********** ViewAllRewardsComponent.ts: ' + error);
			}
		);
  }

}
