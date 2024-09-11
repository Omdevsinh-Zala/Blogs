import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginActions } from './app.actions';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import { ClearErrorService } from '../services/clearError/clear-error.service';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { UserService } from '../services/user/user.service';

@Injectable()
export class LoginEffect {
  constructor(private errorRemover: ClearErrorService) {}
  loginEffec$ = createEffect(
    (
      actions$ = inject(Actions),
      loginService = inject(UserService),
      router = inject(Router)
    ) => {
      return actions$.pipe(
        ofType(loginActions.loginUser),
        switchMap(({ user }) => {
          return loginService.FirebaseUserLogin(user).pipe(
            map(() => {
              router.navigateByUrl('/Home');
              return loginActions.success({message: 'Login Successfully'});
            }),
            catchError((err: FirebaseError) => {
              this.errorRemover.cleareError();
              return of(loginActions.faliure({ error: err.code.split('/')[1] }));
            })
          );
        })
      );
    }
  );
}
