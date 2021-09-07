import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRedeemedRewardsComponent } from './view-redeemed-rewards.component';

describe('ViewRedeemedRewardsComponent', () => {
  let component: ViewRedeemedRewardsComponent;
  let fixture: ComponentFixture<ViewRedeemedRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRedeemedRewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRedeemedRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
