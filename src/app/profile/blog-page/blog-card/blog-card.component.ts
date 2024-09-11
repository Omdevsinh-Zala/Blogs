import { Component, Input, OnInit } from '@angular/core';
import { BlogCardStore } from './ComponentStore/blogCard.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
  providers:[BlogCardStore]
})
export class BlogCardComponent implements OnInit {
  constructor(private store:BlogCardStore) {}
  @Input() title!:string
  ngOnInit(): void {
    this.store.getBlog(this.title)
  }
  blog$ = this.store.blog$
  loading$ = this.store.loading$
}
