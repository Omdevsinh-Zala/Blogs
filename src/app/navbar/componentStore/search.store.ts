import { inject, Injectable } from "@angular/core";
import { Database, query } from "@angular/fire/database";
import { ComponentStore } from "@ngrx/component-store";
import { onValue, ref } from "firebase/database";
import { map, Observable, of, switchMap, tap } from "rxjs";
import { Posts } from "../../models/posts";

interface Initialstate {
    loading: boolean,
    titles: Posts[]
}

const initialstate:Initialstate = {
    loading: false,
    titles: []
}

@Injectable()
export class NavBarStore extends ComponentStore<Initialstate> {
    constructor() {
        super(initialstate)
    }
    loading$ = this.select((state) => state.loading)
    titles$ = this.select((state) => state.titles)

    private setLoading = this.updater((state, value:boolean) => ({...state, loading:value}))
    private setTitle = this.updater((state, data:Posts[]) => ({...state, titles: data}))
    private db = inject(Database)
    private loadBlogTitles$ = this.effect((value$:Observable<string>) => {
        return value$.pipe(
            tap(() => {
                this.setLoading(true)
            }),
            switchMap((value) => {
                return of(query(ref(this.db, 'posts'))).pipe(
                    map((data) => {
                        onValue(data, (snapshot) => {
                            const blogsData:Posts[] = Object.values(snapshot.val())
                            if(value != '') {
                                const data = blogsData.filter((blogs) => blogs.title.toLowerCase().includes(value.toLowerCase()))
                                this.setTitle(data)
                            } else {
                                const data:Posts[] = [];
                                this.setTitle(data)
                            }
                        })
                    })
                )
            })
        )
    })

    loadBlogTitles(data:string) {
        this.loadBlogTitles$(data)
    }
}