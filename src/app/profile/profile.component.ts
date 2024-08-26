import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private service:UserService) {

  }

  ngOnInit(): void {
    this.service.setUserProfile()
  }

  databaseUser$ = this.service.userProfile$
}
