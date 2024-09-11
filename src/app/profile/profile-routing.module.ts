import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CardComponent } from '../home/card/card.component';
import { ChangeProfileComponent } from '../forms/change-profile/change-profile.component';
import { BlogPageComponent } from './blog-page/blog-page.component';

const routes: Routes = [
  {
    path: ':blogTitle',
    component: BlogPageComponent
  },
  { 
    path: '',
    component: ProfileComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
