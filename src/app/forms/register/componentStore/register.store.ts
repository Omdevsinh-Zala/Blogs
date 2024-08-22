import { ComponentStore } from '@ngrx/component-store';
import { LoginUser } from '../../../models/login-user';
import { catchError, delay, exhaustMap, map, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { UserService } from '../../../services/user/user.service';

export interface UserRegisterState {
  error: string | null;
  register: LoginUser;
  isLoading: boolean;
}

@Injectable()
export class RegisterStore extends ComponentStore<UserRegisterState> {
  error$ = this.select((state) => state.error);
  loading$ = this.select((state) => state.isLoading);
  private registerUser$ = this.select((state) => state.register);

  constructor(
    private registerService: UserService,
    private router: Router
  ) {
    super({
      error: null,
      isLoading: false,
      register: {
        email: '',
        password: '',
      },
    });
  }

  private setLoading = this.updater((state) => ({ ...state, isLoading: true }));
  private unsetLoading = this.updater((state) => ({
    ...state,
    isLoading: false,
  }));
  private showError = this.updater((state, error: string) => ({
    ...state,
    error: error,
  }));

  private nullError() {
    setTimeout(() => {
      this.showError('');
    }, 3000);
  }

  private registerUser = this.effect((registerUser$: Observable<LoginUser>) => {
    return registerUser$.pipe(
      tap(() => {
        this.setLoading();
      }),
      exhaustMap((user) => {
        return this.registerService.FirebaseRegister(user).pipe(
          delay(1000),
          map((data) => {
            this.unsetLoading();
            this.nullError();
          }),
          catchError((err: FirebaseError) => {
            this.showError(err.code.split('/')[1]);
            this.unsetLoading();
            this.nullError();
            return of(null);
          })
        );
      })
    );
  });

  register = (user: LoginUser) => {
    this.registerUser(user);
  };
}
