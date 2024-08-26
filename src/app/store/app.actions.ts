import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginUser } from "../models/login-user";
import { Users } from "../models/users";
import { Posts } from "../models/posts";


export const loginActions = createActionGroup({
    source:'Login',
    events:{
        loginUser:props<{user: LoginUser}>(),
        success:props<{message:string}>(),
        faliure:props<{error: string}>()
    }
})