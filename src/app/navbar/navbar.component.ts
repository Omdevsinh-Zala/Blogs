import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar') hide!: ElementRef;
  constructor(private router: Router, private user: UserService) {}
  user$ = this.user.currentUser$
  options:boolean = false;
  // user$ = this.user.user
  ngOnInit(): void {
    this.router.events.subscribe((x) => {
      if (x instanceof NavigationEnd) {
        let page = x.url;
        if (page == '/login' || page == '/register' || page == '/change-password') {
          this.hide.nativeElement.style.display = 'none';
        } else {
          this.hide.nativeElement.style.display = 'flex';
        }
      }
    });
  }

  showOptions() {
    this.options = !this.options
  }

  logIn() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  logout() {
    this.user.firebaseSignOut()
  }
}
