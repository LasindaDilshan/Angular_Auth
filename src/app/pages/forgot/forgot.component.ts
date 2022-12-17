import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  form!:FormGroup;
  cls = '';
  message = '';
  constructor(private formBuilder : FormBuilder , private authservice : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     
      email:''
     
    });
  }
  submit()
  {
    this.authservice.forgot(this.form.getRawValue()).subscribe(
     {
      next:()=>{
          this.cls = 'success';
          this.message = 'Email was sent'

      },
      error:()=>{
        this.cls = 'danger';
        this.message = 'Error occured'

      }
     }
  
  );


  }

}
