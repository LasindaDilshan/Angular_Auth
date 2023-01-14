import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as qrcode from 'qrcode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = { id : 0 , img  : ''}
  constructor(private formBuilder : FormBuilder , private authservice : AuthService, private router: Router) { }

  ngOnInit(): void {
   
   
  }
  onLogin(data :any)
  {
    this.loginData = data ;
   console.log(this.loginData);
   console.log(data.passsql);

    if( data.passsql )
    {
      console.log(this.loginData);
      qrcode.toDataURL(data.passsql , (err : any , img : string) => {
        this.loginData.img = img;
        console.log( this.loginData.img);
      })
    }

  }

}
