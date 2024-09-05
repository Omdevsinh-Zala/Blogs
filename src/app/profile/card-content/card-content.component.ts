import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Users } from '../../models/users';
import { Observable } from 'rxjs';
import { Posts } from '../../models/posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.scss'
})
export class CardContentComponent implements OnInit {
  constructor(private serice:UserService, private router:Router) {}
  user$ = this.serice.currentUser$
  @Input() databaseUser$!:Observable<Users | null>
  ngOnInit(): void {
    this.databaseUser$.subscribe({
      next:(data) => {
        if(data) {
          if(data.posts.userPosts) {}
        }
      }
    })
    if(this.serice.currentUserData) {
      this.userName = this.serice.currentUserData.uniqueName
    } else {
      this.userName = ''
    }
    this.url = this.router.url.split('/')[1]
    console.log(this.userName, this.url)
  }
  url!:string
  userName!:string
  posts!:Posts[]

  addBlogs() {
    this.router.navigateByUrl('/create-blog')
  }
}
