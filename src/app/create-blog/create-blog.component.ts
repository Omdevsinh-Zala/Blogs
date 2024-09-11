import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Alignment,
  AutoImage,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  Font,
  Heading,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageCustomResizeUI,
  ImageResize,
  ImageResizeButtons,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  SimpleUploadAdapter,
  Table,
  Underline,
  Undo,
  WordCount,
} from 'ckeditor5';
import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../dialogbox/preview/preview.component';
import { Posts } from '../models/posts';
import { UserService } from '../services/user/user.service';
import { Store } from '@ngrx/store';
import { ClearErrorService } from '../services/clearError/clear-error.service';
import { loginActions } from '../store/app.actions';
import { BlogsService } from '../services/blogsService/blogs.service';
import { CreateBlogStore } from './store/createBlog.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
  providers: [CreateBlogStore],
})
export class CreateBlogComponent {
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private stor: Store,
    private errorRemover: ClearErrorService,
    private component: CreateBlogStore,
    private router:Router
  ) {
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }
  dialog = inject(MatDialog);
  form!: FormGroup;
  Editor = ClassicEditor;
  config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'underline',
      'horizontalLine',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'insertImage',
      'blockQuote',
      'codeBlock',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'alignment',
      '|',
      'insertTable',
      'mediaEmbed',
      '|',
      'heading',
      'code',
    ],
    plugins: [
      Bold,
      Essentials,
      Italic,
      Font,
      Mention,
      Paragraph,
      Undo,
      Alignment,
      AutoImage,
      BlockQuote,
      CodeBlock,
      Code,
      Heading,
      Image,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Base64UploadAdapter,
      ImageResize,
      ImageResizeButtons,
      ImageResizeEditing,
      ImageResizeHandles,
      ImageCustomResizeUI,
      LinkImage,
      Italic,
      Link,
      List,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      SimpleUploadAdapter,
      Table,
      Underline,
      WordCount,
      HorizontalLine,
    ],
    placeholder: 'Type your content here...',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:block',
        'imageStyle:side',
        'imageResize',
        'toggleImageCaption',
        '|',
        'linkImage',
      ],
      insert: {
        integrations: ['upload', 'assetManager', 'url'],
      },
    },
  };

  tags = this.fb.group({
    tag: new FormControl('', Validators.required),
  });

  addTag() {
    if (this.tags.value.tag?.trim() == '') {
      this.stor.dispatch(loginActions.faliure({ error: 'Enter valid tags' }));
      this.errorRemover.cleareError();
      this.tags.reset();
    } else {
      const tag = this.tags.value.tag?.trim().toLowerCase()!;
      this.tagsArray.push(tag);
      this.tags.reset();
    }
  }

  tagsArray: string[] = [];
  refreshChips(data: string) {
    const index = this.tagsArray.findIndex((tag) => tag == data);
    if (index >= 0) {
      this.tagsArray.splice(index, 1);
    }
  }

  loading$ = this.component.loading$;
  success$ = this.component.success$;

  uploadBlog() {
    const data: { title: string; content: string } = this.form.getRawValue();
    const title = data.title.split(' ').join('_')
    const date = new Date();
    const postData: Posts = {
      title: data.title,
      body: data.content,
      id: '',
      created: date.getTime(),
      reactions: { likes: '' },
      tags: this.tagsArray,
      user: this.service.currentUserData.uniqueName,
      userId: this.service.currentUserData.id.toString(),
      useremail: this.service.currentUserData.email,
      image: this.service.currentUserData.image,
      views: [],
      titleForRouter: `${title}-${date.getTime()}`
    };
    this.component.uploadBlog(postData);
    this.success$.subscribe({
      next: (value) => {
        if (value == true) {
          this.form.reset();
          this.tags.reset();
          this.tagsArray = [];
          this.router.navigateByUrl(`/${postData.user}`)
        }
      },
    });
  }

  previewBlog() {
    const data = {
      title: this.form.getRawValue().title,
      content: this.form.getRawValue().content,
      tags: this.tagsArray,
    };
    this.dialog.open(PreviewComponent, {
      data: data,
      height: '800px',
      width: '80%',
    });
  }
}
