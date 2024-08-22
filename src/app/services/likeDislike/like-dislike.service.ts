import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interaction } from '../../models/likeViews';
import { Posts } from '../../models/posts';

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {

  constructor(private http:HttpClient) { }

  interactionsOnPosts() {
    return this.http.get<Posts[]>('http://localhost:3000/api/posts')
  }

  likePost() {
    return this.http.get<Interaction[]>('http://localhost:3000/api/likes')
  }

  likeThePost(data: Interaction) {
    return this.http.post<Interaction>('http://localhost:3000/api/likes',data)
  }

  removeLike(id:number, data:any) {
    return this.http.put(`http://localhost:3000/api/likes/${id}`,data)
  }
}
