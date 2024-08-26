import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoginEffect } from './store/app.effects';
import { LoginKey, LoginReducer } from './store/app.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { reqInterceptor } from './interceptor/req.interceptor';
import { ForgetPasswordComponent } from './forms/forget-password/forget-password.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment.development';
import { ChangeProfileComponent } from './forms/change-profile/change-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ForgetPasswordComponent,
    ChangeProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    MatIconModule,
    MatProgressSpinner,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(LoginKey, LoginReducer),
    EffectsModule.forRoot([LoginEffect]),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([reqInterceptor])),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
