import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Posts } from "../../models/posts";


export const profileActions = createActionGroup({
    source: 'Profile',
    events:{
        loadPage:emptyProps(),
        loadSuccess:emptyProps(),
        loadFail:props<{error: string}>(),
        loadBlog:props<{title: string}>(),
        blogSuccess:props<{Blog: Posts | null}>(),
        BlogFail:props<{error: string}>()
    }
})