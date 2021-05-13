import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewMilestoneComponent } from './create-new-milestone.component';

describe('CreateNewMilestoneComponent', () => {
  let component: CreateNewMilestoneComponent;
  let fixture: ComponentFixture<CreateNewMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
