import { inject, Injectable } from '@angular/core';
import { Database, onValue, push, set } from '@angular/fire/database';
import { query, ref } from 'firebase/database';
import { Posts } from '../../models/posts';
import { BehaviorSubject, from, map, of, ReplaySubject } from 'rxjs';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Users } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private service:UserService, private http:HttpClient) { }
  private db = inject(Database)
  private Postref = ref(this.db, 'posts')
  private userPosts = new ReplaySubject<Posts | null>()
  private userPosts$ = this.userPosts.asObservable()

  posBlog(data: Posts) {
    const newPostRef = push(this.Postref)
    let postData:Posts = {
      ...data,
      id: newPostRef.key!
    }
    this.postUserBlogData(postData)
    return from(set(newPostRef, postData))
    // return of(null)
  }

  postUserBlogData(data:Posts) {
    this.http.get<{userPosts: string}>(`${environment.firebaseConfig.databaseURL}/users/${this.service.currentUserData.id}/posts.json`).subscribe({
      next:(receiveData) => {
        if(receiveData) {
          if(receiveData.userPosts) {
            const array = {userPosts: receiveData.userPosts.concat(',' + data.id)}
            this.http.patch(`${environment.firebaseConfig.databaseURL}/users/${this.service.currentUserData.id}/posts.json`,array).subscribe()
          }else {
            const newData = {userPosts: data.id}
            this.http.patch(`${environment.firebaseConfig.databaseURL}/users/${this.service.currentUserData.id}/posts.json`,newData).subscribe()
          }
        } else {
          const newData = {userPosts: data.id}
            this.http.patch(`${environment.firebaseConfig.databaseURL}/users/${this.service.currentUserData.id}/posts.json`,newData).subscribe()
        }
      }
    })
  }

  retrievUserBlogs(data:string) {
    const newRef = ref(this.db, `posts/${data}`)
    const reciveData = query(newRef)
    onValue(reciveData, (snapshot) => {
      this.userPosts.next(snapshot.val())
    })
    return this.userPosts$
  }

  removeBlogFromPosts(data: string) {
    return this.http.delete(`${environment.firebaseConfig.databaseURL}/posts/${data}.json`)
  }

  removeBlogFromUser(data:string) {
    this.http.get<{userPosts: string}>(`${environment.firebaseConfig.databaseURL}/users/${this.service.currentUserData.id}/posts.json`).subscribe({
      next:(value) => {
        const userPosts = value.userPosts;
        if(userPosts.includes(',')) {
          const dataArray = userPosts.split(',').filter((post) => post != data)
          const newData = {userPosts: dataArray.join(',')}
          this.http.patch(`${environment.firebaseConfig.databaseURL}/users/${this.service.currentUserData.id}/posts.json`,newData).subscribe()
        } else {
          const newData = ''
          this.http.patch(`${environment.firebaseConfig.databaseURL}/users/${this.service.currentUserData.id}/posts.json`,newData).subscribe()
        }
      }
    })
  }
}
