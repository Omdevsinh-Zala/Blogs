import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Posts } from '../../models/posts';
import { Database, getDatabase, ref, set, update } from '@angular/fire/database';
import { environment } from '../../../environments/environment.development';
import { child, onValue, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  private db = inject(Database)
  private auth = inject(Auth)
  private userId = this.auth.currentUser?.uid

  getFirebasePosts() {
    return onValue(ref(this.db,'/posts'),(snapshot) => {
      const name = snapshot.val()
      return name
    })
  }

  getAllPosts():Observable<{[key:string]:Posts}> {
    return new Observable(Observer => {
      const data = onValue(ref(this.db,'/posts'),snapshot => {
        Observer.next(snapshot.val())
      })
    })
    // return this.http.get<Posts[]>('http://localhost:3000/api/posts')
  }

  uploadPostFirebase(data: Posts) {
    const newData:Posts = {
      ...data,
      id: data.id+1
    }
    const newPostKey = push(child(ref(this.db), 'posts')).key;
    const updates:any = {};
    updates['/posts/' + newPostKey] = newData;
    return update(ref(this.db),updates)
  }
}
