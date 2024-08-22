import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../../store/app.reducer';
import { loginActions } from '../../store/app.actions';
import { LoginUser } from '../../models/login-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private store:Store){}
  ngOnInit(): void {
    this.loading$ = this.store.select(selectIsLoading)
  }
  loading$!:Observable<boolean>
  show:boolean = false
  loginGroup = new FormGroup({
    email: new FormControl('',(Validators.required,Validators.email)),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  showPassword() {
    this.show = !this.show
  }

  login() {
    const user:LoginUser = {
      email: this.loginGroup.value.email!.toLowerCase().trim(),
      password: this.loginGroup.value.password!.trim()
    };
    if(user.email && user.password) {
      this.store.dispatch(loginActions.loginUser({user: user}))
    }
  }
}
