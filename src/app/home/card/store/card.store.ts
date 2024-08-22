import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { LikeDislikeService } from "../../../services/likeDislike/like-dislike.service";
import { Observable, of, switchMap, tap } from "rxjs";
import { Interaction } from "../../../models/likeViews";

interface interactions {
    like: number,
    dislike: number
    view: number,
    userLiked: boolean,
    userDisliked: boolean,
    userViewed: boolean
}

@Injectable()
export class CardStore extends ComponentStore<interactions> {
    constructor(private service:LikeDislikeService) {
        super({
            like: 0,
            dislike: 0,
            view: 0,
            userLiked:false,
            userDisliked:false,
            userViewed: false
        })
    }
    likes$ = this.select((state) => state.like)
    dislikes$ = this.select((state) => state.dislike)
    views$ = this.select((state) => state.view)
    userLiked$ = this.select((state) => state.userLiked)
    userDisiked$ = this.select((state) => state.userDisliked)
    userViewed$ = this.select((state) => state.userViewed)

    private setLikes = this.updater((state, like:number) => ({...state, like:like}))
    private setDislikes = this.updater((state, dislike:number) => ({...state, like:dislike}))
    private setViews = this.updater((state, view:number) => ({...state, like:view}))
    private setUserLiked = this.updater((state, like:boolean) => ({...state, userLiked:like}))
    private setUserDisiked = this.updater((state, like:boolean) => ({...state, userDisliked:like}))
    private setUserViewed = this.updater((state, like:boolean) => ({...state, userViewed:like}))

    // private like$ = this.effect((id$:Observable<number>) => {
    //     return id$.pipe(
    //         switchMap((post_id) => {
    //             return this.service.likePost().pipe(
    //                 map((data) => {
    //                     return data.filter((post) => post.post_id === post_id)
    //                 }),
    //                 map((data) => {
    //                     if(data.length != 0) {
    //                         this.setLikes(data[0].user_id.length)
    //                     } else {
    //                         let data:Interaction = {
    //                             post_id: post_id,
    //                             user_id: [this.auth.userId]
    //                         }
    //                         this.service.likeThePost(data).subscribe()
    //                         this.setLikes(data.user_id.length)
    //                     }
    //                 }),
    //                 catchError((err:HttpErrorResponse) => {
    //                     return of(postsActions.postsFail({error: err.message}))
    //                 })
    //             )
    //         })
    //     )
    // })

    // like = (id:number) => {
    //     this.like$(id)
    // }

    data:Interaction = {
        id:0,
        posts:[],
        view:[]
    }

    private getInteractions$ = this.effect((origin$: Observable<Interaction>) => {
        return origin$.pipe(
            switchMap((data) => {
                if(data.posts.length != 0) {
                    this.setLikes(data.posts.length)
                    console.log(data.posts.length)
                    if(data.posts.includes(data.id)) {
                        this.setUserLiked(true)
                    } else {
                        this.setUserLiked(false)
                    }
                } else {
                    this.setLikes(0)
                    this.setUserLiked(false)
                }
                if(data.view.length != 0) {
                    // data.posts.likes.length
                    this.setViews(data.view.length)
                    if(data.view.includes(data.id)) {
                        this.setUserViewed(true)
                    } else {
                        this.setUserViewed(false)
                    }
                } else {
                    this.setViews(0)
                    this.setUserViewed(false)
                }
                return of(null)
            })
        )
    })

    getInteractions = (data:Interaction) => {
        this.getInteractions$(data)
    }
}