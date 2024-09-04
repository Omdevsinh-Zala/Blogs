import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared module/shared.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MatCardModule,
    MatIconModule,
    AsyncPipe,
    MatProgressSpinner
  ]
})
export class HomeModule { }
