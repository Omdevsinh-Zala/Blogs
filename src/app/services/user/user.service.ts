import { Injectable } from '@angular/core';
import { Auth, updatePassword, user } from '@angular/fire/auth';
import { User, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { ReplaySubject, from } from 'rxjs';
import { LoginUser } from '../../models/login-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebaseAuth:Auth) {
    this.setUser()
   }
  currentUser = user(this.firebaseAuth)
  private user = new ReplaySubject<User | null>(1)
  currentUser$ = this.user.asObservable();

  setUser() {
    this.currentUser.subscribe({
      next:(data:User) => {
        if(data) {
          this.user.next(data)
          localStorage.setItem('User', 'true')
        } else {
          this.user.next(null)
          localStorage.clear()
        }
      }
    })
  }

  //RegisterUser
  FirebaseRegister(user:LoginUser) {
    let promise = createUserWithEmailAndPassword(this.firebaseAuth, user.email, user.password).then((res) => {
      updateProfile(res.user,{displayName: user.email.split('@')[0], photoURL: this.randomImage()})
    })
    return from(promise)
  }

  private randomImage() {
    let images:string[] = [
      'assets/images/boy.png',
      'assets/images/cat.png',
      'assets/images/gamer.png',
      'assets/images/man (1).png',
      'assets/images/man (2).png',
      'assets/images/man (3).png',
      'assets/images/man (4).png',
      'assets/images/man.png',
      'assets/images/woman (1).png',
      'assets/images/woman.png',
    ]
    const randomNumber:number = Math.floor(Math.random() * images.length);
    return images[randomNumber];
  }

  //LoginUser
  FirebaseUserLogin(user:LoginUser) {
    let promise = signInWithEmailAndPassword(this.firebaseAuth, user.email, user.password).then(() => localStorage.setItem('User', 'true'))
    return from(promise);
  }

  //updatePassword
  FirebaseUpdatePassword(data: string) {
    let promise = updatePassword(this.firebaseAuth.currentUser!, data).then()
    return from(promise)
  }

  //SignOut
  firebaseSignOut() {
    let promise = this.firebaseAuth.signOut().then((res) => {
      this.setUser()
    }
    )
    return from(promise)
  }
}
