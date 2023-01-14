import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 authenticated = false;
  constructor(private authservice : AuthService,private router: Router , private socialAuhService : SocialAuthService) { }

  ngOnInit(): void {
    AuthService.authEmitter.subscribe(authenticated =>{
      this.authenticated = authenticated
    })
  }

  logout(){
    console.log('log out');
    this.socialAuhService.signOut();

    this.authservice.logout().subscribe(
{next:(res) => {
  this.authservice.accessToken='';
  console.log(res);
  AuthService.authEmitter.emit(false);
  AuthService.googleLogout.emit(true);

  this.router.navigate(['/login']);
},
error:(error)=>{alert('Logout Failed');}
}

    );
  }

}


