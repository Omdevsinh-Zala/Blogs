import { Component, Input, input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from '../../models/posts';
import { Users } from '../../models/users';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private service:UserService) {
  }
  user$ = this.service.currentUser$
  @Input() databaseUser$!:Observable<Users | null>
}
