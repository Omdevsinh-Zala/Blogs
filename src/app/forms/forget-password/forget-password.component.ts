import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Update, UpdatePasswordStore } from './componentStore/updatePassword.store';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  providers:[UpdatePasswordStore]
})
export class ForgetPasswordComponent {
  constructor(private store:UpdatePasswordStore) {}
  show1:boolean= false;
  show2:boolean= false;
  error$ = this.store.error$;
  loading$ = this.store.loading$
  updatePasswordGroup = new FormGroup({
    pass: new FormControl('',[Validators.required, Validators.minLength(8)]),
    cpass: new FormControl('',[Validators.required, Validators.minLength(8)])
  })
  showPassword1() {
    this.show1 = !this.show1
  }
  showPassword2() {
    this.show2 = !this.show2
  }

  updatePassword() {
    let pass = this.updatePasswordGroup.value.pass!;
    let cpass = this.updatePasswordGroup.value.cpass!
    if(pass === cpass) {
      this.store.updatePassword(cpass)
    } else {
      this.store.setError('Password did not match')
    }
  }
}
