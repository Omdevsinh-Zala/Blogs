import { createFeature, createReducer, on } from "@ngrx/store";
import { Users } from "../models/users";
import { loginActions } from "./app.actions";
import { Action } from "rxjs/internal/scheduler/Action";


interface LoggedUser {
    message:string
    error: string | null,
    isLoading: boolean,
    isLoggedIn:boolean
} 

const inistialState:LoggedUser = {
    message:'',
    error:null,
    isLoading: false,
    isLoggedIn: false
}

const loginFeature = createFeature({
    name:'Login',
    reducer:createReducer(
        inistialState,
        on(loginActions.loginUser,(state, action) => ({...state, isLoading: true, isLoggedIn: false})),
        on(loginActions.success, (state, action) => ({...state, message: action.message, isLoading: false, isLoggedIn:true})),
        on(loginActions.faliure,(state, action) => ({...state, error:action.error, isLoading: false, isLoggedIn: false}))
    )
})

export const {name: LoginKey, reducer: LoginReducer,selectIsLoading,selectIsLoggedIn, selectLoginState, selectMessage, selectError} = loginFeature