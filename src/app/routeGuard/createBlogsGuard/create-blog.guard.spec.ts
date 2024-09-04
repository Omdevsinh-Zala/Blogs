import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createBlogGuard } from './create-blog.guard';

describe('createBlogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createBlogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
