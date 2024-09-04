import { createFeature, createReducer, on } from "@ngrx/store"
import { profileActions } from "./profile.actions"
import { Posts } from "../../models/posts"


interface InitialState {
    loading: boolean
    error: string,
    postLoadig: boolean,
    userPosts: Posts[] | null
}

const initialstate:InitialState = {
    loading: false,
    error: '',
    postLoadig: false,
    userPosts: null
}

const profileFeature = createFeature({
    name:'Profile',
    reducer:createReducer(
        initialstate,
        on(profileActions.loadPage, (state) => ({...state, loading: true})),
        on(profileActions.loadSuccess, (state) => ({...state, loading: false})),
        on(profileActions.loadFail, (state, {error}) => ({...state, error: error}))
    )
})

export const { name:ProfileKey, reducer:profileReducer, selectError , selectLoading , selectProfileState } = profileFeature