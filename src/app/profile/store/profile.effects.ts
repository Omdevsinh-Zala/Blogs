import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';
import { profileActions } from './profile.actions';
import { map, switchMap } from 'rxjs';
import { loginActions } from '../../store/app.actions';
import { Router } from '@angular/router';
import { ClearErrorService } from '../../services/clearError/clear-error.service';

@Injectable()
export class ProfileEffrects {
  constructor(
    private actio$: Actions,
    private service: UserService,
    private router: Router,
    private clearError: ClearErrorService,
  ) {}
  profileEffects$ = createEffect(() => {
    return this.actio$.pipe(
      ofType(profileActions.loadPage),
      switchMap(() => {
        return this.service.setUserProfile(true).pipe(
          switchMap(() => {
            return this.service.userProfile$.pipe(
              map((data) => {
                if (data) {
                  console.log(data)
                  return profileActions.loadSuccess();
                } else {
                  this.router.navigateByUrl('/Home');
                  this.clearError.cleareError();
                  return loginActions.faliure({ error: 'User not exists' });
                }
              })
            );
          })
        );
      })
    );
  });
}
