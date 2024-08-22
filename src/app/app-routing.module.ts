import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { loginRegisterGuard } from './routeGuard/loginRegister/login-register.guard';
import { RegisterComponent } from './forms/register/register.component';
import { ForgetPasswordComponent } from './forms/forget-password/forget-password.component';
import { updateGuard } from './routeGuard/updatePassword/update.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate:[loginRegisterGuard]
  },
  {
    path:'register',
    component:RegisterComponent,
    title:'Register',
    canActivate:[loginRegisterGuard]
  },
  {
    path:'change-password',
    component:ForgetPasswordComponent,
    title:"Update Password",
    canActivate:[updateGuard]
  },
  {
    path:'',
    redirectTo:'Home',
    pathMatch:'full'
  },
  {
    path: 'Home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    title:'Home Page'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
