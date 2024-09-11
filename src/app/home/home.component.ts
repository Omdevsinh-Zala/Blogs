import { Component, OnInit } from '@angular/core';
import { Posts } from '../models/posts';
import { PostsService } from '../services/postService/posts.service';
import { HomeStore } from './ComponentStore/home.store';
import { from, map, skip, take, toArray } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[HomeStore]
})
export class HomeComponent implements OnInit {
  constructor(private store:HomeStore, private post:PostsService) {}
  ngOnInit(): void {
    this.store.loadPosts()
  }
  limit:number = 10
  error$ = this.store.error$
  loading$ = this.store.loading$
  posts$ = this.store.posts$.pipe(
    map((data) => {
      return from(data!).pipe(
        map((data) => {
          return data
        }),
        // take(this.limit),
        toArray()
      )
    })
  )

  addPost(data: Posts) {
    // this.service.submitPost(data)
  }

  showMore() {
    this.limit += 10;
    this.posts$ = this.store.posts$.pipe(
      map((data) => {
        return from(data!).pipe(
          map((data) => {
            return data
          }),
          take(this.limit),
          toArray()
        )
      })
    )
  }
}
