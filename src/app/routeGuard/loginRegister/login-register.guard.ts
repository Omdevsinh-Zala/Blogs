import { inject } from '@angular/core';
import { CanActivateFn, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginActions } from '../../store/app.actions';
import { ClearErrorService } from '../../services/clearError/clear-error.service';
import { UserService } from '../../services/user/user.service';

export const loginRegisterGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let redirecUrl:string = ''
  let store = inject(Store)
  let errorRemover = inject(ClearErrorService)
  router.events.subscribe((data) => {
    if(data instanceof NavigationStart) {
      redirecUrl = data.url
    }
  })
  let user = localStorage.getItem('User')
  if(user) {
    store.dispatch(loginActions.faliure({error: 'You are already login'}))
    errorRemover.cleareError()
    return router.navigateByUrl(redirecUrl).then(() => false)
  }
  return true;
};
