import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { loginRegisterGuard } from './routeGuard/loginRegister/login-register.guard';
import { RegisterComponent } from './forms/register/register.component';
import { ForgetPasswordComponent } from './forms/forget-password/forget-password.component';
import { updateGuard } from './routeGuard/updatePassword/update.guard';
import { TitleService } from './services/resolver/title.service';
import { ChangeProfileComponent } from './forms/change-profile/change-profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [loginRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
    canActivate: [loginRegisterGuard],
  },
  {
    path: 'change-password',
    component: ForgetPasswordComponent,
    title: 'Update Password',
    canActivate: [updateGuard],
  },
  {
    path: 'change-profile',
    component: ChangeProfileComponent,
    title: 'Change Profile',
    canActivate: [updateGuard],
  },
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    title: 'Home Page',
  },
  {
    path: ':name',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    title: TitleService,
    canActivate:[updateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
