import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar') hide!: ElementRef;
  @ViewChild('profileHide') opton!: ElementRef;
  constructor(private router: Router, private user: UserService) {}
  user$ = this.user.currentUser$
  currentUser$ = this.user.currentUserRef$
  options:boolean = false;
  userName:string = ''
  ngOnInit(): void {
    this.router.events.subscribe((x) => {
      if (x instanceof NavigationEnd) {
        let page = x.url;
        if (page == '/login' || page == '/register' || page == '/change-password' || page == '/change-profile') {
          this.hide.nativeElement.style.display = 'none';
        } else {
          this.hide.nativeElement.style.display = 'flex';
        }
      }
    });
    this.user$.subscribe({
      next:(data) => {
        if(data) {
          this.userName = data.displayName!
        }
      }
    })
  }

  url:string = ''

  ngAfterViewInit(): void {
    // this.hideProfile()
  }

  showOptions() {
    this.user$.subscribe({
      next:(data) => {
        if(data) {
          this.userName = '/' + data.displayName!
        }
      }
    })
    this.hideProfile()
    this.options = !this.options
  }

  logIn() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  profile() {
    this.currentUser$.subscribe({
      next:(data) => {
        this.router.navigateByUrl(`${data?.uniqueName}`)
        this.options = !this.options
      }
    })
  }

  logout() {
    this.user.firebaseSignOut()
  }

  hideProfile() {
    this.url = this.router.url
  }
}
