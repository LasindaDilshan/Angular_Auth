import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  form!:FormGroup;

  constructor(private formBuilder : FormBuilder , private authservice : AuthService, private router: Router , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     
      password:'',
      PasswordConfirm:''

     
    });
  }
  submit()
  {
    const formData = this.form.getRawValue();

    const data ={
      ...formData,
      token: this.route.snapshot.params['token']
    }

    this.authservice.reset(data).subscribe(
     {
      next:()=>{
          this.router.navigate(['/login']);

      },
      error:()=>{
        console.log("reset error ");

      }
     }
  
  );


  }

}
