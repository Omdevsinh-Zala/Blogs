import { Injectable } from '@angular/core';
import { Posts } from '../../../models/posts';
import { ComponentStore } from '@ngrx/component-store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { BlogsService } from '../../../services/blogsService/blogs.service';

interface Initialstate {
  loading: boolean;
  posts: Posts[];
}

const initialState: Initialstate = {
  loading: false,
  posts: [],
};

@Injectable()
export class CardContentStore extends ComponentStore<Initialstate> {
  constructor(private service: BlogsService) {
    super(initialState);
  }

  loading$ = this.select((state) => state.loading);
  posts$ = this.select((state) => state.posts);
  private allPosts: Posts[] = [];
  private setLoading = this.updater((state, value: boolean) => ({
    ...state,
    loading: value,
  }));
  private setPosts = this.updater((state) => ({
    ...state,
    posts: this.allPosts,
  }));

  private getUserPosts$ = this.effect((data$: Observable<string>) => {
    return data$.pipe(
      tap(() => {
        this.setLoading(true);
      }),
      switchMap((data$) => {
        return this.service.retrievUserBlogs(data$).pipe(
          map((data) => {
            if (data) {
              if (this.allPosts.length == 0) {
                this.allPosts.push(data);
                this.setLoading(false);
              } else {
                const userIndex = this.allPosts.findIndex(
                  (post) => post.user == data.user
                );
                if (userIndex == -1) {
                  this.allPosts = [];
                  const index = this.allPosts.findIndex(
                    (post) => post.id == data.id
                  );
                  if (index == -1) {
                    this.allPosts.push(data);
                  }
                  this.setLoading(false);
                } else {
                  const index = this.allPosts.findIndex(
                    (post) => post.id == data.id
                  );
                  if (index == -1) {
                    this.allPosts.push(data);
                  }
                  this.setLoading(false);
                }
              }
              this.setPosts();
            } else {
              this.allPosts = [];
              this.setPosts();
            }
          })
        );
      })
    );
  });

  getUserBlogs(data: string) {
    this.getUserPosts$(data);
  }

  private postId = ''
  private removeBlog$ = this.effect((data$:Observable<string>) => {
    return data$.pipe(
        tap(() => {
            this.setLoading(true)
        }),
        switchMap((data$) => {
            return this.service.removeBlogFromPosts(data$).pipe(
                map(() => {
                    this.postId = data$
                    this.service.removeBlogFromUser(this.postId)
                    setTimeout(() => {
                        this.setLoading(false)
                    },1000)
                })
            )
        })
    )
  })

  removeUserBlog(data:string) {
    this.removeBlog$(data)
  }
}
