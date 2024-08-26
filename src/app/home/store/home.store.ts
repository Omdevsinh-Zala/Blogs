import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Posts } from '../../models/posts';
import { update } from 'firebase/database';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { PostsService } from '../../services/postService/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseError } from 'firebase/app';

interface InitialState {
  posts: Posts[] | null;
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  posts: [],
  loading: false,
  error: '',
};

@Injectable()
export class HomeStore extends ComponentStore<InitialState> {
  constructor(private service: PostsService) {
    super(initialState);
  }

  keys: string[] = [];

  loading$ = this.select((state) => state.loading);
  error$ = this.select((state) => state.error);
  posts$ = this.select((state) => state.posts);

  private setLoading = this.updater((state) => ({ ...state, loading: true }));
  private setPosts = this.updater((state, posts: Posts[]) => ({
    ...state,
    posts: posts,
    loading: false,
  }));
  private setError = this.updater((state, error: string) => ({
    ...state,
    loading: false,
    error: error,
  }));

  private loadPosts$ = this.effect((event$) => {
    return event$.pipe(
      tap(() => {
        this.setLoading();
      }),
      exhaustMap(() => {
        return this.service.getAllPosts().pipe(
          map((data) => {
            this.keys = Object.keys(data);
            return Object.values(data);
          }),
          map((data) => {
            this.keys.forEach((key, i) => {
              data[i] = {
                ...data[i],
                id: key,
              };
            });
            this.setPosts(data)
          }),
          catchError((err:FirebaseError) => {
            this.setError(err.code.split('/')[1])
            return of(null)
          })
        );
      })
    );
  });

  loadPosts = () => {
    this.loadPosts$()
  }
}
