import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Posts } from "../../models/posts";

export const postsActions = createActionGroup({
    source:'Post',
    events:{
        getAllPosts:emptyProps(),
        searchPost:props<{search:string}>(),
        likePost:props<{id:number}>(),
        dislikePost:props<{id:number}>(),
        viewPost:props<{id: number}>(),
        success:props<{posts: Posts[] | null}>(),
        postsFail:props<{error: string}>()
    }
})
