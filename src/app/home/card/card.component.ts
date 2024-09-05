import { Component, Input, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { CardStore } from './store/card.store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers:[CardStore]
})
export class CardComponent implements OnInit {
  constructor(){}
  @Input() post!:Posts

  tagClasses:{[tag:string]:string} = {}

  ngOnInit(): void {
    this.post.tags.forEach((tag) => {
      this.tagClasses[tag] = this.randomClass()
    })
  }

  randomClass() {
    let classes = ['red','blue','yellow','green','purple']
    const number = Math.floor(Math.random()*classes.length);
    return classes[number]
  }

}
