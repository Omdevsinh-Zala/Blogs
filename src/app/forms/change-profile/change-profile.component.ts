import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SocilaLinks, Users } from '../../models/users';
import { UpdateUser } from '../../models/updateUser';
import { Router } from '@angular/router';
import { loginActions } from '../../store/app.actions';
import { Store } from '@ngrx/store';
import { ClearErrorService } from '../../services/clearError/clear-error.service';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrl: './change-profile.component.scss',
})
export class ChangeProfileComponent implements OnInit {
  constructor(
    private service: UserService,
    private router: Router,
    private store: Store,
    private error: ClearErrorService
  ) {}
  user!: Users;

  ngOnInit(): void {
    this.service.currentUserRef$.subscribe({
      next: (data) => {
        if (data) {
          this.user = data;
          this.userProfile.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            location: data.location,
            email: data.email,
            bio: data.bio,
            work: data.work,
            workEmail: data.workEmail,
            learning: data.learning,
            skills: data.skills,
            language: data.language,
          });

          this.socialLinks.patchValue({
            github: data.socialLinks[0].gitHub,
            facebook: data.socialLinks[0].facebook,
            twitter: data.socialLinks[0].twitter,
            instagram: data.socialLinks[0].instagram,
          });
        }
      },
    });
  }

  userProfile = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    bio: new FormControl('', [Validators.required]),
    workEmail: new FormControl('', [Validators.required, Validators.email]),
    work: new FormControl('', [Validators.required]),
    learning: new FormControl('', [Validators.required]),
    skills: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
  });

  socialLinks = new FormGroup({
    github: new FormControl(''),
    facebook: new FormControl(''),
    twitter: new FormControl(''),
    instagram: new FormControl(''),
  });

  updateProfile() {
    const socialLinks: SocilaLinks[] = [
      {
        gitHub: this.socialLinks.getRawValue().github?.trim()!,
        facebook: this.socialLinks.getRawValue().facebook?.trim()!,
        instagram: this.socialLinks.getRawValue().instagram?.trim()!,
        twitter: this.socialLinks.getRawValue().twitter?.trim()!,
      },
    ];

    const userData: UpdateUser = {
      firstName: this.userProfile.getRawValue().firstName?.trim()!,
      lastName: this.userProfile.getRawValue().lastName?.trim()!,
      bio: this.userProfile.getRawValue().bio?.trim()!,
      language: this.userProfile.getRawValue().language?.trim()!,
      learning: this.userProfile.getRawValue().learning?.trim()!,
      location: this.userProfile.getRawValue().location?.trim()!,
      skills: this.userProfile.getRawValue().skills?.trim()!,
      work: this.userProfile.getRawValue().work?.trim()!,
      workEmail: this.userProfile.getRawValue().workEmail?.trim()!,
      socialLinks: socialLinks,
    };

    if (userData.language && userData.language.includes(',')) {
      this.service.firebaseUpdateUser(this.user, userData).subscribe();
      this.service.currentUserRef$.subscribe({
        next: (data) => {
          this.router.navigateByUrl(`${data?.uniqueName}`);
        },
      });
    } else {
      this.store.dispatch(
        loginActions.faliure({ error: "Language must include ' , ' in it" })
      );
      this.error.cleareError();
    }
  }
}