import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder : FormBuilder , private authservice : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     
      email:'',
      password:''
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
      this.authservice.accessToken = result.token;
      AuthService.authEmitter.emit(true);

  console.log(result);  
  this.router.navigate(['/']);},
error:(error)=>{alert('Login Failed');
//console.log(this.error)
}}
    
    );

  }
}
