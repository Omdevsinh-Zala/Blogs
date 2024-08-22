import { createFeature, createReducer, on } from "@ngrx/store";
import { Posts } from "../../models/posts";
import { postsActions } from "./home.actions";

interface Post {
    postLoading:boolean,
    posts: Posts[] | null,
    postError: string,
    id:number | null
}

const inistialState:Post = {
    postLoading: false,
    posts:[],
    postError:'',
    id:null
}

const postsFeature = createFeature({
    name: 'Post',
    reducer:createReducer(
        inistialState,
        on(postsActions.getAllPosts, (state) => ({...state, postLoading: true})),
        on(postsActions.searchPost,(state) => ({...state, postLoading:true})),
        on(postsActions.likePost, (state, action) => ({...state, id:action.id})),
        on(postsActions.dislikePost,(state,action) => ({...state, id:action.id})),
        on(postsActions.viewPost,(state, action) => ({...state, id:action.id})),
        on(postsActions.success,(state, action) => ({...state, posts: action.posts, postLoading: false})),
        on(postsActions.postsFail, (state, {error}) => ({...state, error, postLoading: false}))
    )
})

export const {name:PostsKey, reducer: PostsReducer, selectPosts, selectPostLoading, selectId, selectPostError} = postsFeature