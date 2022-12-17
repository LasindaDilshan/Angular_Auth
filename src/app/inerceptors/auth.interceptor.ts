import { EventEmitter, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap , throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 refresh = false;
  constructor(private authservice:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders:{Authorization: `Bearer ${this.authservice.accessToken}`}
    });
   console.log('12');
    return next.handle(req).pipe(catchError((err : HttpErrorResponse)=>{
      if(err.status===401 && !this.refresh){
        this.refresh = true;
       return this.authservice.refresh().pipe(

        switchMap((res:any)=>{
          this.authservice.accessToken = res.token;
        
          return next.handle(request.clone({
            setHeaders:{Authorization: `Bearer ${this.authservice.accessToken}`
          }
          }));
        
        })
       );
      }
      this.refresh = false;
  return throwError(()=> {err ; 
    console.log('13');

  
  })
 }));
  }
}




