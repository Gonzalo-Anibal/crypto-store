import { TestBed } from '@angular/core/testing';

import { NasdaqApiService } from './nasdaq-api.service';

describe('NasdaqApiService', () => {
  let service: NasdaqApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NasdaqApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
