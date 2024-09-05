import { createFeature, createReducer, on } from "@ngrx/store";
import { loginActions } from "./app.actions";


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