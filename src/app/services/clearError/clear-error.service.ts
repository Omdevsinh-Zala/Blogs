import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginActions } from '../../store/app.actions';

@Injectable({
  providedIn: 'root'
})
export class ClearErrorService {

  constructor(private store:Store) { }
  cleareError() {
    setTimeout(() => {
      this.store.dispatch(loginActions.faliure({error: ''}))
    },3000)
  }
}
