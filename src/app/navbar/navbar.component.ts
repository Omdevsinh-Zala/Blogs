import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { NavBarStore } from './componentStore/search.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers:[NavBarStore]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('navbar') hide!: ElementRef;
  @ViewChild('profileHide') opton!: ElementRef;
  constructor(private router: Router, private user: UserService, private store:NavBarStore) {}
  user$ = this.user.currentUser$;
  currentUser = this.user.currentUserRef$;
  currentUser$ = this.user.currentUserRef$;
  options: boolean = false;
  userName: string = '';
  ngOnInit(): void {
    this.router.events.subscribe((x) => {
      if (x instanceof NavigationEnd) {
        let page = x.url;
        if (
          page == '/login' ||
          page == '/register' ||
          page == '/change-password' ||
          page == '/update-profile'
        ) {
          this.hide.nativeElement.style.display = 'none';
        } else {
          this.hide.nativeElement.style.display = 'flex';
        }
      }
    });
    this.currentUser$.subscribe({
      next: (data) => {
        if (data) {
          this.userName = '/' + data.uniqueName!;
        }
      },
    });
  }
  blogTitles$ = this.store.titles$
  url: string = '';
  showOpt:boolean = false

  showOptions() {
    this.hideProfile();
    this.options = !this.options;
  }

  logIn() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  profile() {
    let firstTime = true
    this.currentUser$.subscribe({
      next: (data) => {
        if(firstTime) {
          this.user.lastUrl = data?.uniqueName!
          this.router.navigateByUrl(`/${data?.uniqueName}`);
        this.options = !this.options
        firstTime = false
        }
      },
    });
  }

  logout() {
    const route = this.router.url.split('/')[1];
    if (route == 'create-blog') {
      this.router.navigateByUrl('/Home');
    }
    this.user.firebaseSignOut();
    this.options = !this.options;
  }

  hideProfile() {
    this.url = this.router.url;
  }

  updateProfile() {
    let firstTime = true;
    this.user.lastUrl = this.router.url.split('/')[1];
    this.currentUser$.subscribe({
      next: (data) => {
        if (firstTime) {
          this.router.navigateByUrl(`/update-profile`);
          this.options = !this.options
          firstTime = false;
        }
      },
    });
  }
  timer:any
  search(data:string) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.store.loadBlogTitles(data)
    },500)
  }

  hideSearches(value: any) {
    const data = ''
    this.store.loadBlogTitles(data)
  }

  ngOnDestroy(): void {
    // this.options = !this.options
  }
}
