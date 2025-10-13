import { TestBed } from '@angular/core/testing';

import { DataPointsService } from './data-points.service';

describe('DataPointsService', () => {
  let service: DataPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
