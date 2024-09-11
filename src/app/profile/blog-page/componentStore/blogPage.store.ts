import { inject, Injectable } from "@angular/core"
import { Posts } from "../../../models/posts"
import { ComponentStore } from "@ngrx/component-store"
import { catchError, map, Observable, of, switchMap, tap } from "rxjs"
import { BlogsService } from "../../../services/blogsService/blogs.service"
import { Users } from "../../../models/users"
import { user } from "@angular/fire/auth"
import { Router } from "@angular/router"
import { ClearErrorService } from "../../../services/clearError/clear-error.service"
import { loginActions } from "../../../store/app.actions"
import { Database, onValue } from "@angular/fire/database"
import { ref } from "firebase/database"
import { FirebaseError } from "firebase/app"
import { Store } from "@ngrx/store"

interface Initialstate {
    loading: boolean,
    blog: Posts | null,
    blogUser: Users | null
}

const initialstate:Initialstate = {
    loading: false,
    blog: null,
    blogUser: null
}

@Injectable()
export class BlogPageStore extends ComponentStore<Initialstate> {
    constructor(private service:BlogsService, private router:Router, private clearError:ClearErrorService, private store:Store) {
        super(initialstate)
    }

    loading$ = this.select((state) => state.loading)
    blog$ = this.select((state) => state.blog)
    blogUser$ = this.select((state) => state.blogUser)

    private setLoading = this.updater((state, value:boolean) => ({...state, loading: value}))
    private setBlogs = this.updater((state, data:Posts) => ({...state, blog:data}))
    private setBlogUser = this.updater((state, data:Users) => ({...state, blogUser:data}))
    private db = inject(Database)
    private loadBlog$ = this.effect((name$:Observable<{title: string, user:string}>) => {
        return name$.pipe(
            tap(() => {
                this.setLoading(true)
            }),
            switchMap((value) => {
                return this.service.loadBlogData(value.title).pipe(
                    map((data) => {
                        onValue(data, (snashot) => {
                            const blogData:Posts[] = [snashot.val()]
                            if(blogData[0] != null) {
                                this.setBlogs(blogData[0])
                                onValue(ref(this.db, `users/${blogData[0].userId}`), (snapshot) => {
                                    const userData = [snapshot.val()]
                                    if(userData[0] != null) {
                                        this.setBlogUser(userData[0])
                                        this.setLoading(false)
                                    } else {
                                        this.router.navigateByUrl('/Home');
                                        this.clearError.cleareError();
                                        this.store.dispatch(loginActions.faliure({error: 'User no longer exists'}))
                                        this.setLoading(false)
                                    }
                                })
                            } else {
                                this.router.navigateByUrl('/Home');
                                this.clearError.cleareError();
                                this.store.dispatch(loginActions.faliure({error: 'Cannot access blog'}))
                                this.setLoading(false)
                            }
                        })
                    })
                )
            })
        )
    })

    loadBlog(data:{title:string, user:string}) {
        this.loadBlog$(data)
    }
}