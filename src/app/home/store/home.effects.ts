import { Injectable } from "@angular/core";
import { PostsService } from "../../services/postService/posts.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { postsActions } from "./home.actions";
import { catchError, delay, filter, map, of, pipe, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { LikeDislikeService } from "../../services/likeDislike/like-dislike.service";

@Injectable()
export class PostsEffects {
    constructor(private service:PostsService,private actions$:Actions, private interaction:LikeDislikeService) {}

    getAllPostsEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(postsActions.getAllPosts),
            switchMap(() => {
                return this.service.getAllPosts().pipe(
                    delay(1000),
                    map((data) => {
                        return Object.values(data)
                    }),
                    map((data) => {
                        return postsActions.success({posts: data})
                    }),
                    catchError((err:HttpErrorResponse) => {
                        return of(postsActions.postsFail({error: err.message}))
                    })
                )
            })
        )
    })
}