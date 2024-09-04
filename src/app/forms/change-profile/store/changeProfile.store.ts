import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Users } from "../../../models/users";
import { UpdateUser } from "../../../models/updateUser";
import { catchError, delay, map, Observable, of, switchMap, tap } from "rxjs";
import { UserService } from "../../../services/user/user.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { ClearErrorService } from "../../../services/clearError/clear-error.service";
import { loginActions } from "../../../store/app.actions";

interface Initialstate {
    mainLoading:boolean
    loading: boolean
}

const initialstate:Initialstate = {
    mainLoading:true,
    loading: false
}

export interface Values {
    user:Users
    data: UpdateUser
}

@Injectable()
export class ChangeProfileStore extends ComponentStore<Initialstate> {
    constructor(private service:UserService, private router:Router, private store:Store, private errorService:ClearErrorService) {
        super(initialstate)
    }

    loading$ = this.select((state) => state.loading)
    mainLoading$ = this.select((state) => state.mainLoading)

    private setLoading = this.updater((state, value:boolean) => ({...state, loading: value}))
    private setMainLoading = this.updater((state, value:boolean) => ({...state, mainLoading: value}))

    private updateUser$ = this.effect((data$:Observable<Values>) => {
        return data$.pipe(
            tap(() => {
                this.setLoading(true)
            }),
            switchMap((data$) => {
                return this.service.firebaseUpdateUser(data$.user, data$.data).pipe(
                    map((data) => {
                        //Need to change in future
                        this.service.updateUserImage(data$.data.image!).pipe(
                        )
                    }),
                    delay(1000),
                    map((data) => {
                        this.setLoading(false)
                        // this.router.navigateByUrl(`${data$.user.uniqueName}`)
                    }),
                    catchError((err:HttpErrorResponse) => {
                        this.store.dispatch(loginActions.faliure({error: err.error.error}))
                        this.errorService.cleareError()
                        this.setLoading(false)
                        return of(null)
                    })
                )
            })
        )
    })

    updateUser = (data:Values) => {
        this.updateUser$(data)
    }

    private getData$ = this.effect((origin$:Observable<void>) => {
        return origin$.pipe(
            tap(() => {
            }),
            switchMap(() => {
                return this.service.currentUserRef$.pipe(
                    map((data) => {
                        this.setMainLoading(false)
                    }),
                    catchError((err:HttpErrorResponse) => {
                        this.store.dispatch(loginActions.faliure({error: err.error.error}))
                        this.errorService.cleareError()
                        this.setMainLoading(false)
                        return of(null)
                    })
                )
            })
        )
    })

    getData() {
        this.getData$()
    }
}