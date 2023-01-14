import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output('onLogin') onLogin = new EventEmitter();
  form!: FormGroup;
  googleAuthenticated = false;
  constructor(private formBuilder : FormBuilder , private authservice : AuthService, private router: Router,private socialAuhService: SocialAuthService) { }

  ngOnInit(): void {

    console.log('gFormComponent');
    this.form = this.formBuilder.group({
     
      email:'',
      password:''
        });
//this.refreshToken();
  console.log('google user');
  console.log('this.googleAuthenticated :' + this.googleAuthenticated);

this.socialAuhService.authState.subscribe((googleUser) => {
  console.log(googleUser);
  if(googleUser !=null){
  this.authservice.googleLogin({
    token: googleUser.idToken
  }).subscribe((res:any)=>{
this.authservice.accessToken = res.token;
AuthService.authEmitter.emit(true);
this.router.navigate(['/']);

  });
  }

}); 






}


  
  submit(){
    console.log(this.form.getRawValue()); 
    this.authservice.login(this.form.getRawValue()).subscribe(
    //   (result : any) => {
    //     this.authservice.accessToken = result.Token;
    // console.log(result);  
    // this.router.navigate(['/']);}
    {next:  (result : any) => {
      this.onLogin.emit(result);
      console.log(result);  
      },
error:(error)=>{alert('Login Failed');
//console.log(this.error)
}}
    
    );

    
  }
  googlelogin(){
this.socialAuhService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleUser => {
      console.log(googleUser);

});

  }

  refreshToken(): void {
    this.socialAuhService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then(googleUser => {
      console.log(googleUser);

});;
  }
}
