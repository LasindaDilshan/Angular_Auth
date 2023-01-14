import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
message ='';
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    console.log('HOme');

  this.authservice.user().subscribe(
    { next:(res: any) =>{
      this.message = `Hi ${res.first_name} ${res.last_name}`;
      AuthService.authEmitter.emit(true);
      console.log(res);
      console.log('HOme api');

      
    },error:(err) =>{
      this.message = "You are not authenticated"
      AuthService.authEmitter.emit(false);

      console.log('15');
    }}
  );


  }

}
