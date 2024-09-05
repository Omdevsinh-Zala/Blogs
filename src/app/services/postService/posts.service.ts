import { inject, Injectable } from '@angular/core';
import { Posts } from '../../models/posts';
import { Database, limitToFirst, ref, set } from '@angular/fire/database';
import { onValue, push, query } from 'firebase/database';
import { Auth, getAuth } from '@angular/fire/auth';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  private db = inject(Database)
  private auth = inject(Auth)
  private postRef = ref(this.db,'posts')
  private data = new ReplaySubject<{[key:string]:Posts}>()
  limit:number = 10;
  data$ = this.data.asObservable()
  authenticate = getAuth()

  getAllPosts():Observable<{[key:string]:Posts}> {
    const data = query(this.postRef, limitToFirst(10))
    onValue(data,(snapshot) => {
      return this.data.next(snapshot.val())
    })
    return this.data$
  }

  submitPost(data:Posts) {
    const newPostRef = push(this.postRef)
    set(newPostRef,data)
  }
}
