import { TestBed } from '@angular/core/testing';

import { RateMeNagService } from './rate-me-nag.service';

describe('RateMeNagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RateMeNagService = TestBed.get(RateMeNagService);
    expect(service).toBeTruthy();
  });
});
