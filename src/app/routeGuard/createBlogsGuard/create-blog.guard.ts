import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClearErrorService } from '../../services/clearError/clear-error.service';
import { loginActions } from '../../store/app.actions';

export const createBlogGuard: CanActivateFn = (route, state) => {
  const store = inject(Store)
  const removeError = inject(ClearErrorService)
  const data = localStorage.getItem('User')
  const router = inject(Router)
  if(data) {
    return true
  } else {
    store.dispatch(loginActions.faliure({error:'Login in order to access this page'}))
    removeError.cleareError()
    return router.navigateByUrl('/Home').then(() => false)
  }
};
