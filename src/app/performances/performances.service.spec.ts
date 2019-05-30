import { TestBed } from '@angular/core/testing';

import { PerformancesService } from './performances.service';

describe('PerformancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerformancesService = TestBed.get(PerformancesService);
    expect(service).toBeTruthy();
  });
});
