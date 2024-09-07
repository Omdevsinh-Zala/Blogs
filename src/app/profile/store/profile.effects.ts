import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';
import { profileActions } from './profile.actions';
import { map, switchMap } from 'rxjs';
import { loginActions } from '../../store/app.actions';
import { Router } from '@angular/router';
import { ClearErrorService } from '../../services/clearError/clear-error.service';
import { BlogsService } from '../../services/blogsService/blogs.service';

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
        return this.service.setUserProfile(true).pipe(
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

  loadBlog$ = createEffect(() => {
    return this.actio$.pipe(
      ofType(profileActions.loadBlog),
      switchMap(({ title: data }) => {
        return this.blogService.loadBlogData().pipe(
          map((blogs) => {
            const blogsData = Object.values(blogs);
            const blogData = blogsData.filter(
              (blogs) => blogs.titleForRouter === data
            );
            if (blogData.length != 0) {
              this.blogService.getBlogUser(blogData[0].user)
              return profileActions.blogSuccess({ Blog: blogData[0] });
            } else {
              this.router.navigateByUrl('/Home');
              this.clearError.cleareError();
              return loginActions.faliure({ error: 'Blog not exists' });
            }
          })
        );
      })
    );
  });
}
