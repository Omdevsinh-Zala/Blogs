import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SocilaLinks, Users } from '../../models/users';
import { UpdateUser } from '../../models/updateUser';
import { loginActions } from '../../store/app.actions';
import { Store } from '@ngrx/store';
import { ClearErrorService } from '../../services/clearError/clear-error.service';
import { ChangeProfileStore, Values } from './store/changeProfile.store';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrl: './change-profile.component.scss',
  providers:[ChangeProfileStore]
})
export class ChangeProfileComponent implements OnInit {
  constructor(
    private service: UserService,
    private store: Store,
    private error: ClearErrorService,
    private componentStore: ChangeProfileStore
  ) {}
  mainLoading$ = this.componentStore.mainLoading$
  loading$ = this.componentStore.loading$
  user!: Users;
  user$ = this.service.currentUserRef$;
  options: boolean = false;
  images: string[] = [
    'assets/images/boy.png',
    'assets/images/cat.png',
    'assets/images/gamer.png',
    'assets/images/man-1.png',
    'assets/images/man-2.png',
    'assets/images/man-3.png',
    'assets/images/man-4.png',
    'assets/images/man.png',
    'assets/images/woman-1.png',
    'assets/images/woman.png',
  ];
  selectedImage:string = ''
  @ViewChild('img') img!:ElementRef

  ngOnInit(): void {
    this.componentStore.getData()
    this.service.currentUserRef$.subscribe({
      next: (data) => {
        if (data) {
          this.user = data;
          this.service.lastUrl = data.uniqueName
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

    let userData: UpdateUser = {
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
    if(this.selectedImage) {
      userData = {
        ...userData,
        image: this.selectedImage
      }
    }
    if (userData.language == '' || userData.language.includes(',')) {
      let data:Values = {
        user:this.user,
        data: userData
      }
      this.componentStore.updateUser(data)
    } else {
      this.store.dispatch(
        loginActions.faliure({ error: "Language must include ' , ' in it" })
      );
      this.error.cleareError();
    }
  }
  showImages() {
    console.log('1')
    this.options = !this.options
  }

  selectImage(data: string) {
    this.selectedImage = data
    this.img.nativeElement.src = data
  }
}
