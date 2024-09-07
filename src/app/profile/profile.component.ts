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
export class ProfileComponent implements OnInit,OnDestroy {
  constructor(private service:UserService, private store:Store, private router:Router, private sanitizer:DomSanitizer, private blogService:BlogsService) {
    this.route = this.router.events.subscribe({
      next:(data) => {
        if(data instanceof NavigationEnd) {
          this.service.urlUpdate(data.url.split('/')[1])
          const url = service.urlProfile$.subscribe({
            next:(data) => {
              if(data.includes('-')) {
                this.store.dispatch(profileActions.loadBlog({title: data}))
              } else {
                this.store.dispatch(profileActions.loadPage())
              }
            }
          })
          this.value = url
          this.value.unsubscribe()
        }
      }
    })
  }
  route!:Subscription
  value!:Subscription
  tagClasses:{[tag:string]:string} = {}
  loading$ = this.store.select(selectLoading)
  ngOnInit(): void {
    this.blog$.subscribe({
      next:(data) => {
        data?.tags.forEach((tag) => {
          this.tagClasses[tag] = this.randomClass()
        })
      }
    })
  }

  randomClass() {
    const classes = ['red','blue','yellow','green','purple']
    const number = Math.floor(Math.random()*classes.length);
    return classes[number]
  }

  ngOnDestroy(): void {
    this.store.complete()
    this.route.unsubscribe()
  }
  access$ = this.store.select(selectAccess)
  blog$ = this.store.select(selectBlog)
  databaseUser$ = this.service.userProfile$
  sanitize = this.sanitizer;
  blogPostedUser$ = this.blogService.blogPostedUser$
}
