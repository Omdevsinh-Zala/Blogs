import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginUser } from "../models/login-user";


export const loginActions = createActionGroup({
    source:'Login',
    events:{
        loginUser:props<{user: LoginUser}>(),
        success:props<{message:string}>(),
        faliure:props<{error: string}>()
    }
})