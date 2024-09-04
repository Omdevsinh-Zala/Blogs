import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';
import { profileActions } from './profile.actions';
import { catchError, delay, map, of, switchMap, takeLast, toArray } from 'rxjs';
import { loginActions } from '../../store/app.actions';
import { Router } from '@angular/router';
import { ClearErrorService } from '../../services/clearError/clear-error.service';
import { BlogsService } from '../../services/blogsService/blogs.service';
import { FirebaseError } from 'firebase/app';

@Injectable()
export class ProfileEffrects {
  constructor(
    private actio$: Actions,
    private service: UserService,
    private router: Router,
    private clearError: ClearErrorService,
    private blogService: BlogsService
  ) {}
  profileEffects$ = createEffect(() => {
    return this.actio$.pipe(
      ofType(profileActions.loadPage),
      switchMap(() => {
        return this.service.setUserProfile().pipe(
          switchMap(() => {
            return this.service.userProfile$.pipe(
              map((data) => {
                if (data) {
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
