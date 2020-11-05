import { TestBed } from '@angular/core/testing';

import { ChecksService } from './checks.service';

describe('ChecksService', () => {
  let service: ChecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
