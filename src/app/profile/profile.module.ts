import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardExtraComponent } from './card-extra/card-extra.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    CardContentComponent,
    CardExtraComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinner
  ]
})
export class ProfileModule { }
