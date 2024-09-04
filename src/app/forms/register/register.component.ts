import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../../models/login-user'
import { RegisterStore } from './componentStore/register.store';
import { query, onValue } from 'firebase/database';
import { of } from 'rxjs';
import { Users } from '../../models/users';
import { loginActions } from '../../store/app.actions';
import { UserService } from '../../services/user/user.service';
import { Store } from '@ngrx/store';
import { ClearErrorService } from '../../services/clearError/clear-error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers:[RegisterStore]
})
export class RegisterComponent {
  constructor(private registerStore:RegisterStore, private service:UserService, private store:Store, private clear:ClearErrorService) {}
  error$ = this.registerStore.error$
  loading$ = this.registerStore.loading$
  show:boolean = false
  registerForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    uniqueName: new FormControl('',[Validators.required])
  });

  showPassword() {
    this.show = !this.show
  }

  registerUser() {
    const userData:LoginUser = {
      email: this.registerForm.value.email!.toLowerCase().trim(),
      password: this.registerForm.value.password!.trim(),
      uniqueName: this.registerForm.value.uniqueName!.toLowerCase().trim()
    }
    if(userData.email && userData.password) {
      this.service.uniqueNameService().subscribe({
        next:(data) => {
          if(data) {
            const usersData = Object.values(data)
          const userFilter = usersData.filter((user) => user.uniqueName == userData.uniqueName)
          if(userFilter.length == 0) {
                  this.registerStore.register(userData);
                } else {
                  this.store.dispatch(loginActions.faliure({error: 'Unique name already taken'}))
                  this.clear.cleareError()
                }
          } else {
            this.registerStore.register(userData);
          }
        }
      })
    }
  }
}
