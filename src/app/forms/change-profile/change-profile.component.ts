import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrl: './change-profile.component.scss'
})
export class ChangeProfileComponent {
  userProfile = new FormGroup({
    firstName:new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    bio: new FormControl('', [Validators.required]),
    workEmail: new FormControl('',[Validators.required, Validators.email])
  })
}
