import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { updateGuard } from './update.guard';

describe('updateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => updateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
