import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const profileActions = createActionGroup({
    source: 'Profile',
    events:{
        loadPage:emptyProps(),
        loadSuccess:emptyProps(),
        loadFail:props<{error: string}>()
    }
})