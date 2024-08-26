import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Users } from '../../models/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-extra',
  templateUrl: './card-extra.component.html',
  styleUrl: './card-extra.component.scss'
})
export class CardExtraComponent {
  constructor(private service:UserService) {}
  @Input() databaseUser$!:Observable<Users | null>
}
