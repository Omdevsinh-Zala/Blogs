import { inject, Injectable } from '@angular/core';
import { Auth, updatePassword, user } from '@angular/fire/auth';
import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Observable, ReplaySubject, from, of } from 'rxjs';
import { LoginUser } from '../../models/login-user';
import { Database, limitToFirst, onValue, push, update } from '@angular/fire/database';
import { child, query, ref, set } from 'firebase/database';
import { Router } from '@angular/router';
import { Users } from '../../models/users';
import { Store } from '@ngrx/store';
import { loginActions } from '../../store/app.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { UpdateUser } from '../../models/updateUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firebaseAuth: Auth, private router: Router, private http:HttpClient) {
    this.setUser();
  }
  private currentUser = user(this.firebaseAuth);
  private user = new ReplaySubject<User | null>(1);
  currentUser$ = this.user.asObservable();
  private db = inject(Database);
  userRef = ref(this.db, 'users');
  private currentUserRef = new ReplaySubject<Users | null>(1);
  currentUserRef$ = this.currentUserRef.asObservable();
  private userProfile = new ReplaySubject<Users | null>(1);
  userProfile$ = this.userProfile.asObservable()
  currentUserData!:Users

  setUser() {
    this.currentUser.subscribe({
      next: (data: User) => {
        if (data) {
          this.user.next(data);
          this.setCurrentUser(data);
        } else {
          this.user.next(null);
          localStorage.clear();
          this.setCurrentUser(data);
        }
      },
    });
  }

  //RegisterUser
  FirebaseRegister(user: LoginUser) {
    const imageUrl = this.randomImage();
    let promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    ).then((res) => {
      updateProfile(res.user, {
        displayName: user.email.split('@')[0],
        photoURL: imageUrl,
      });
      this.firebaseUserRegister(user, imageUrl);
    });
    // return of(null);
    return from(promise);
  }

  private randomImage() {
    let images: string[] = [
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
    ];
    const randomNumber: number = Math.floor(Math.random() * images.length);
    return images[randomNumber];
  }

  //LoginUser
  FirebaseUserLogin(user: LoginUser) {
    let promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    ).then(() => {
      localStorage.setItem('User', 'true');
    });
    return from(promise);
  }

  //updatePassword
  FirebaseUpdatePassword(data: string) {
    let promise = updatePassword(this.firebaseAuth.currentUser!, data).then();
    return from(promise);
  }

  //SignOut
  firebaseSignOut() {
    let promise = this.firebaseAuth.signOut().then((res) => {
      this.user.next(null);
      this.setUser();
    });
    return from(promise);
  }

  //Registering user in database
  firebaseUserRegister(data: LoginUser, imageUrl: string) {
    const date = new Date();
    const newUserRef = push(this.userRef);
    const newUser: Users = {
      accountCreated: date.getTime(),
      bio: '',
      email: data.email,
      firstName: data.email.split('@')[0],
      id: newUserRef.key as unknown as number,
      image: imageUrl,
      language: '',
      lastName: '',
      uniqueName: data.uniqueName,
      learning: '',
      location: '',
      password: data.password,
      skills: '',
      socialLinks: [{ gitHub: '', facebook: '', twitter: '', instagram: '' }],
      work: '',
      workEmail: '',
    };
    set(newUserRef, newUser);
  }

  //For getting data on profile page
  setUserProfile() {
    const userData = query(this.userRef);
    onValue(userData, (snapshot) => {
      const user: { [key: string]: Users } = snapshot.val();
      const users = Object.values(user);
      const name = this.router.url.split('/')[1];
      const currentUser = users.filter((user) => user.uniqueName == name);
      this.userProfile.next(currentUser[0]);
    });
    return of(null)
  }

  //To set current user data
  setCurrentUser(data: User | null) {
    if (data) {
      const userData = query(this.userRef);
      onValue(userData, (snapshot) => {
        const user: { [key: string]: Users } = snapshot.val();
        const users = Object.values(user);
        const currentUser = users.filter((user) => user.email == data.email);
        this.currentUserRef.next(currentUser[0]);
        this.currentUserData = currentUser[0]
      });
    } else {
      this.currentUserRef.next(null);
    }
  }

  //For duplicate uniqueName check
  uniqueNameService() {
    return this.http.get<{[key:string]:Users}>(`${environment.firebaseConfig.databaseURL}` + '/users.json')
  }

  //Update user data
  firebaseUpdateUser(user:Users , data: UpdateUser) {
    return this.http.patch(environment.firebaseConfig.databaseURL + `/users/${user.id}.json`, data)
  }
}