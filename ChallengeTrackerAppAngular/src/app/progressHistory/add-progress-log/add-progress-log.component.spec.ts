import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgressLogComponent } from './add-progress-log.component';

describe('AddProgressLogComponent', () => {
  let component: AddProgressLogComponent;
  let fixture: ComponentFixture<AddProgressLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgressLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgressLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
