import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BlogPageStore } from './componentStore/blogPage.store';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  providers:[BlogPageStore]
})
export class BlogPageComponent implements OnInit, OnDestroy {
  constructor(private router:Router, private store:BlogPageStore, private sanitizer:DomSanitizer) {
    this.routerSub = this.router.events.subscribe({
      next:(url) => {
        if(url instanceof NavigationEnd) {
          const values = url.url.split('/');
          const data = {title: values[2], user: values[1]}
          this.store.loadBlog(data)
        }
      }
    })
    this.url = this.router.url.split('/')[2]
  }
  url!:string
  routerSub!:Subscription
  blog$ = this.store.blog$
  loading$ = this.store.loading$
  sanitize = this.sanitizer
  blogUser$ = this.store.blogUser$
  tagClasses:{[tag:string]:string} = {}
  ngOnInit(): void {
    this.blog$.pipe(
      map((data) => {
        data?.tags.forEach((tag) => {
          this.tagClasses[tag] = this.randomClass()
        })
      })
    ).subscribe()
  }

  randomClass() {
    const classes = ['red','blue','yellow','green','purple']
    const number = Math.floor(Math.random()*classes.length);
    return classes[number]
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe()
  }
}
