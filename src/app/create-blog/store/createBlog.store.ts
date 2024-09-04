import { Injectable } from "@angular/core"
import { ComponentStore } from "@ngrx/component-store"
import { Posts } from "../../models/posts"
import { catchError, delay, map, Observable, of, switchMap, tap } from "rxjs"
import { BlogsService } from "../../services/blogsService/blogs.service"
import { Store } from "@ngrx/store"
import { ClearErrorService } from "../../services/clearError/clear-error.service"
import { FirebaseError } from "firebase/app"
import { loginActions } from "../../store/app.actions"

interface Initialstate {
    loading: boolean,
    success:boolean
}

const initialstate:Initialstate = {
    loading: false,
    success: false
}

@Injectable()
export class CreateBlogStore extends ComponentStore<Initialstate> {
    constructor(private service:BlogsService, private store:Store, private errorRemover:ClearErrorService) {
        super(initialstate)
    }

    loading$ = this.select((state) => state.loading)
    success$ = this.select((state) => state.success)

    private setLoading = this.updater((state, value:boolean) => ({...state, loading:value}))
    private setSuccess = this.updater((state, value:boolean) => ({...state, success:value}))

    private uploadBlog$ = this.effect((data:Observable<Posts>) => {
        return data.pipe(
            tap(() => {
                this.setLoading(true)
            }),
            switchMap((data) => {
                return this.service.posBlog(data).pipe(
                    delay(1000),
                    map((data) => {
                        this.setLoading(false)
                        this.setSuccess(true)
                    }),
                    catchError((err:FirebaseError) => {
                        this.store.dispatch(loginActions.faliure({error: err.message}))
                        return of(null)
                    })
                )
            })
        )
    })

    uploadBlog(data:Posts) {
        this.uploadBlog$(data)
    }
}