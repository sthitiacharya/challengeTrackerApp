import { TestBed } from '@angular/core/testing';

import { ProgressHistoryService } from './progress-history.service';

describe('ProgressHistoryService', () => {
  let service: ProgressHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
