import { createFeature, createReducer, on } from "@ngrx/store"
import { profileActions } from "./profile.actions"
import { Posts } from "../../models/posts"
import { Users } from "../../models/users"


interface InitialState {
    loading: boolean
    error: string,
    blog: Posts | null,
    blogError: string,
    access: string,
    blogUser:Users | null
}

const initialstate:InitialState = {
    loading: false,
    error: '',
    blog: null,
    blogError: '',
    access: '',
    blogUser: null
}

const profileFeature = createFeature({
    name:'Profile',
    reducer:createReducer(
        initialstate,
        on(profileActions.loadPage, (state) => ({...state, loading: true})),
        on(profileActions.loadSuccess, (state) => ({...state, loading: false, access:'user'})),
        on(profileActions.loadFail, (state, {error}) => ({...state, error: error, access:'none'})),
        on(profileActions.loadBlog, (state) => ({...state, loading: true})),
        on(profileActions.blogSuccess, (state, {Blog}) => ({...state, blog: Blog, loading: false,access:'blog'})),
        on(profileActions.blogFail,(state, {error}) => ({...state, error: error,access:'none'}))
    )
})

export const { name:ProfileKey, reducer:profileReducer, selectError , selectLoading , selectProfileState, selectBlog, selectBlogError, selectAccess } = profileFeature