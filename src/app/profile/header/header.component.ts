import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../../models/users';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router:Router, private service:UserService) {
  }
  url = this.router.url.split('/')
  @Input() databaseUser$!:Observable<Users | null>
  currentUser = this.service.currentUserData
}
