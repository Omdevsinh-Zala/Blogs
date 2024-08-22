import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../../models/login-user'
import { RegisterStore } from './componentStore/register.store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers:[RegisterStore]
})
export class RegisterComponent {
  constructor(private registerStore:RegisterStore) {}
  error$ = this.registerStore.error$
  loading$ = this.registerStore.loading$
  show:boolean = false
  registerForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  });

  showPassword() {
    this.show = !this.show
  }

  registerUser() {
    const userData:LoginUser = {
      email: this.registerForm.value.email!.toLowerCase().trim(),
      password: this.registerForm.value.password!.trim()
    }
    if(userData.email && userData.password) {
      this.registerStore.register(userData);
    }
  }
}
