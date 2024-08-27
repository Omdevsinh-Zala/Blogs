import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Users } from '../models/users';
import { Store } from '@ngrx/store';
import { profileActions } from './store/profile.actions';
import { selectLoading } from './store/profile.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private service:UserService, private store:Store) {
    this.store.dispatch(profileActions.loadPage())
  }

  loading$ = this.store.select(selectLoading)

  ngOnInit(): void {
    this.service.setUserProfile()
  }

  ngOnDestroy(): void {
  }

  databaseUser$ = this.service.userProfile$
}
