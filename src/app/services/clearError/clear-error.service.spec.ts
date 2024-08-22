import { TestBed } from '@angular/core/testing';

import { ClearErrorService } from './clear-error.service';

describe('ClearErrorService', () => {
  let service: ClearErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
