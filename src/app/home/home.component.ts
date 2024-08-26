import { Component, OnDestroy, OnInit } from '@angular/core';
import { Posts } from '../models/posts';
import { PostsService } from '../services/postService/posts.service';
import { HomeStore } from './store/home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[HomeStore]
})
export class HomeComponent implements OnInit {
  constructor(private store:HomeStore, private service:PostsService, private post:PostsService) {}
  ngOnInit(): void {
    this.store.loadPosts()
  }
  
  error$ = this.store.error$
  loading$ = this.store.loading$
  posts$ = this.store.posts$

  addPost(data: Posts) {
    this.service.submitPost(data)
  }

  showMore() {
    // this.post.limit = this.post.limit + 10
    // this.post.getAllPosts()
  }
}
