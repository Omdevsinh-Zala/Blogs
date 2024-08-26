import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Users } from '../../models/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.scss'
})
export class CardContentComponent {
  constructor(private serice:UserService) {}
  user$ = this.serice.currentUser$
  @Input() databaseUser$!:Observable<Users | null>
}
