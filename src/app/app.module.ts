import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './inerceptors/auth.interceptor';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './pages/reset/reset.component';
import { FormComponent } from './pages/login/form/form.component';
import { AuthenticatorComponent } from './pages/login/authenticator/authenticator.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    ForgotComponent,
    ResetComponent,
    FormComponent,
    AuthenticatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    SocialLoginModule
   ]
    ,

  providers: [ {provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
multi:true},

  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '127115882562-o1ncfvcnq2cuoj6qt7n8mqs627fspru4.apps.googleusercontent.com'
          )
        }
        
      ]
    
  },
}
],
  bootstrap: [AppComponent],
})
export class AppModule { }
