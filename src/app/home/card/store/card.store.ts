import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
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
    constructor() {
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

    data:Interaction = {
        id:0,
        posts:[],
        view:[]
    }
}