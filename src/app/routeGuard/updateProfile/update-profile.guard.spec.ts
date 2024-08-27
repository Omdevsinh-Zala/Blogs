import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { updateProfileGuard } from './update-profile.guard';

describe('updateProfileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => updateProfileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
