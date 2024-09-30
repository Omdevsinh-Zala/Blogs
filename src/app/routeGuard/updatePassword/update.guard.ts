import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClearErrorService } from '../../services/clearError/clear-error.service';
import { loginActions } from '../../store/app.actions';

export const updateGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let redirectUrl:string = '/login'
  let store = inject(Store)
  let errorRemover = inject(ClearErrorService)
  let user = localStorage.getItem('User')
  if(user) {
  } else {
    store.dispatch(loginActions.faliure({error: 'Login in order to access the page'}))
    errorRemover.cleareError()
    return router.navigateByUrl(redirectUrl).then(() => false)
  }
  return true;
};
