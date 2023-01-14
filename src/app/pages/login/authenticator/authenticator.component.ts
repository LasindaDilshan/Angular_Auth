import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  form!: FormGroup;

  @Input('loginData') loginData = {

    id:0,
    img:''
  };
  constructor(private formBuilder : FormBuilder , private authservice : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     
      code:''
        });

  }
  submit(){

    const formData = this.form.getRawValue();
    const data = this.loginData;
    console.log(this.form.getRawValue()); 
    this.authservice.auhenicatorLogin({...data,...formData}).subscribe(
   
    {next:  (result : any) => {
      console.log(result);
      this.authservice.accessToken = result.token;
      AuthService.authEmitter.emit(true);
      this.router.navigate(['/']);
      },
error:(error)=>{alert('Login Failed');
}}
    
    );

  }
}
