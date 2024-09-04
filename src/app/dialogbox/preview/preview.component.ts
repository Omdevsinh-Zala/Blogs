import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit {
  constructor(
    public dialogRef:MatDialogRef<PreviewComponent>,
    private sanitizer:DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data:{title: string,content:string, tags: [string]},
  ){}
  blogData!:SafeHtml
  tags!:string[]
  tagClasses:{[tag:string]:string} = {}
  ngOnInit(): void {
    this.blogData = this.sanitizer.bypassSecurityTrustHtml(this.data.content)
    this.tags = this.data.tags
    this.tags.forEach((tag) => {
      this.tagClasses[tag] = this.randomClass()
    })
  }

  randomClass() {
    const classes = ['red','blue','yellow','green','purple']
    const number = Math.floor(Math.random()*classes.length);
    return classes[number]
  }
}
