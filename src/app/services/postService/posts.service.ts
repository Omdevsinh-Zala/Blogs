import { inject, Injectable } from '@angular/core';
import { Posts } from '../../models/posts';
import { Database, ref, set } from '@angular/fire/database';
import { push } from 'firebase/database';
import { Auth, getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { UpdateUser } from '../../models/updateUser';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  private db = inject(Database)
  private postRef = ref(this.db,'posts')
  limit:number = 10;
  authenticate = getAuth()

  getAllPosts():Observable<{[key:string]:Posts}> {
    return this.http.get<{[key:string]:Posts}>(`${environment.firebaseConfig.databaseURL}/posts.json`)
  }

  submitPost(data:Posts) {
    const newPostRef = push(this.postRef)
    set(newPostRef,data)
  }

  updatePostAvatar(id: string, data: UpdateUser) {
    return this.http.patch(`${environment.firebaseConfig.databaseURL}/posts/${id}.json`, data)
  }
}
