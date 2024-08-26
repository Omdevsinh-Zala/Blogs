import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'ngrx';
  constructor(private store:Store){}
  error$ = this.store.select(selectError)
}
