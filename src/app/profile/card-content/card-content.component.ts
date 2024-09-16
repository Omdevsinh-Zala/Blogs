import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Users } from '../../models/users';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CardContentStore } from './store/cardContent.store';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.scss',
  providers:[CardContentStore]
})
export class CardContentComponent implements OnInit {
  constructor(private serice:UserService, private router:Router, private store:CardContentStore) {}
  user$ = this.serice.currentUser$
  @Input() databaseUser$!:Observable<Users | null>
  ngOnInit(): void {
    this.fetchUserBlogs()
    this.url = this.router.url.split('/')[1]
  }
  url!:string
  userName = this.serice.currentUserRef$
  posts = this.store.posts$
  loading$ = this.store.loading$

  addBlogs() {
    this.router.navigateByUrl('/create-blog')
  }

  removeBlog(id:string) {
    this.store.removeUserBlog(id)
  }

  fetchUserBlogs() {
    this.databaseUser$.subscribe({
      next:(data) => {
        if(data) {
          if(data.posts.userPosts) {
            const value = data.posts.userPosts
            if(value.includes(',')) {
              value.split(',').forEach((blog) => {
                this.store.getUserBlogs(blog)
              })
            } else {
              this.store.getUserBlogs(value)
            }
          } else {
              this.store.nullPosts('')
          }
        }
      }
    })
  }
}
