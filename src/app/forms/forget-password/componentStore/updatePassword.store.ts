import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserService } from '../../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseError } from 'firebase/app';

interface UpdatePassword {
  loading: boolean;
  error: string | null;
  password: Update;
  isChecking: boolean;
  isChecked: boolean;
  isCorrect: boolean;
  email: string;
}

export interface Update {
  pass: string;
}

@Injectable()
export class UpdatePasswordStore extends ComponentStore<UpdatePassword> {
  constructor(private service:UserService, private router:Router
  ) {
    super({
      loading: false,
      error: null,
      password: {
        pass: '',
      },
      isChecked: false,
      isChecking: false,
      isCorrect: false,
      email: '',
    });
  }
  loading$ = this.select((state) => state.loading);
  error$ = this.select((state) => state.error);

  setLoading = this.updater((state) => ({ ...state, loading: true }));
  unsetLoading = this.updater((state) => ({ ...state, loading: false }));
  setError = this.updater((state, error: string) => ({
    ...state,
    error: error,
    loading: false,
  }));

  nullError() {
    setTimeout(() => {
      this.setError('');
    }, 3000);
  }

  updatePassword$ = this.effect((updatePassword$: Observable<string>) => {
    return updatePassword$.pipe(
      tap(() => {
        this.setLoading();
      }),
      switchMap((pass) => {
        return this.service.FirebaseUpdatePassword(pass).pipe(
          map((data) => {
            this.unsetLoading();
            this.service.firebaseSignOut()
            this.router.navigateByUrl('/login')
          }),
          catchError((err: FirebaseError) => {
            this.unsetLoading();
            this.setError(err.code.split('/')[1]);
            this.nullError();
            return of(null);
          })
        )
      })
    );
  });

  updatePassword = (pass: string) => {
    this.updatePassword$(pass);
  };
}
