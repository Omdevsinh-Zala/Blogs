import { inject, Injectable } from "@angular/core";
import { Posts } from "../../../../models/posts";
import { ComponentStore } from "@ngrx/component-store";
import { map, Observable, of, switchMap, tap } from "rxjs";
import { Database, onValue } from "@angular/fire/database";
import { query, ref } from "firebase/database";

interface Initialstate {
    loading:boolean,
    blog:Posts | null
}

const initialstate:Initialstate = {
    loading: false,
    blog: null
}

@Injectable()
export class BlogCardStore extends ComponentStore<Initialstate> {
    constructor() {
        super(initialstate)
    }

    loading$ = this.select((state) => state.loading)
    blog$ = this.select((state) => state.blog)

    private setLoading = this.updater((state, value:boolean) => ({...state, loading:value}))
    private setBlog = this.updater((state, data:Posts) => ({...state, blog:data}))
    private db = inject(Database)
    private getBlog$ = this.effect((title$:Observable<string>) => {
        return title$.pipe(
            tap(() => {
                this.setLoading(true)
            }),
            switchMap((title$) => {
                return of(query(ref(this.db, `posts/${title$}`))).pipe(
                    map((data) => {
                        onValue(data, (snapshot) => {
                            const blog = snapshot.val()
                            this.setBlog(blog)
                        })
                    })
                )
            })
        )
    })

    getBlog(data:string) {
        this.getBlog$(data)
    }
}