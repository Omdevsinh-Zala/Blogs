import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardExtraComponent } from './card-extra/card-extra.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared module/shared.module';
import { LetDirective, PushPipe } from '@ngrx/component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogCardComponent } from './blog-page/blog-card/blog-card.component';

@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    CardContentComponent,
    CardExtraComponent,
    BlogPageComponent,
    BlogCardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    AsyncPipe,
    SharedModule,
    LetDirective,
    PushPipe
  ]
})
export class ProfileModule { }
