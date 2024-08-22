import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPostError, selectPostLoading, selectPosts } from './store/home.reducer';
import { postsActions } from './store/home.actions';
import { Posts } from '../models/posts';
import { PostsService } from '../services/postService/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private store:Store, private service:PostsService) {}
  ngOnInit(): void {
    this.store.dispatch(postsActions.getAllPosts());
  }
  error$ = this.store.select(selectPostError);
  loading$ = this.store.select(selectPostLoading);
  posts$ = this.store.select(selectPosts);

  addPost(data: Posts) {
    this.service.uploadPostFirebase(data)
  }
}
