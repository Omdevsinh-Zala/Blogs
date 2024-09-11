import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Store } from '@ngrx/store';
import { profileActions } from './store/profile.actions';
import { selectAccess, selectBlog, selectLoading } from './store/profile.reducer';
import { NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BlogsService } from '../services/blogsService/blogs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnDestroy {
  constructor(private service:UserService, private store:Store, private router:Router) {
    this.routerSub = this.router.events.subscribe({
      next:(url) => {
        if(url instanceof NavigationEnd) {
          this.store.dispatch(profileActions.loadPage())
        }
      }
  })
  }
  ngOnDestroy(): void {
    this.routerSub.unsubscribe()
  }
  routerSub!:Subscription
  tagClasses:{[tag:string]:string} = {}
  loading$ = this.store.select(selectLoading)
  databaseUser$ = this.service.userProfile$
}
