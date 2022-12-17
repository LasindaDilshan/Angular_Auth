import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  constructor(private formBuilder : FormBuilder , private authservice : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name:'',
      email:'',
      password:'',
      confirmpassword:''
    });
  }

  submit()
  {
    console.log(this.form.getRawValue()); 
    this.authservice.register(this.form.getRawValue()).subscribe(
      (result) => {
    console.log(result);  
    this.router.navigate(['/login']);
  });

  }

}
