import { inject, Injectable } from '@angular/core';
import { Posts } from '../../models/posts';
import { Database, limitToFirst, ref, set } from '@angular/fire/database';
import { onValue, push, Query, query } from 'firebase/database';
import { Auth, getAuth } from '@angular/fire/auth';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  private db = inject(Database)
  private auth = inject(Auth)
  private postRef = ref(this.db,'posts')
  // private data = new ReplaySubject<{[key:string]:Posts}>()
  limit:number = 10;
  // data$ = this.data.asObservable()
  authenticate = getAuth()

  getAllPosts():Observable<{[key:string]:Posts}> {
    // return of(query(this.postRef, limitToFirst(10)))
    // onValue(data,(snapshot) => {
    //   return this.data.next(snapshot.val())
    // })
    // return this.data$
    return this.http.get<{[key:string]:Posts}>(`${environment.firebaseConfig.databaseURL}/posts.json`)
  }

  submitPost(data:Posts) {
    const newPostRef = push(this.postRef)
    set(newPostRef,data)
  }
}
