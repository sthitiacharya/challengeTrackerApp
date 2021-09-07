import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgressLogComponent } from './edit-progress-log.component';

describe('EditProgressLogComponent', () => {
  let component: EditProgressLogComponent;
  let fixture: ComponentFixture<EditProgressLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProgressLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgressLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
