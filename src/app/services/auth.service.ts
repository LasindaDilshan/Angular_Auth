import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken = '';
  static authEmitter = new EventEmitter<boolean> ();

  constructor(private http: HttpClient) { }

register(body : any){

  return this.http.post(`${environment.api}/register`,body);
}

login(body : any){
  return this.http.post(`${environment.api}/login`,body,{withCredentials:true});
}

user(){
  return this.http.get(`${environment.api}/user`);
}
refresh(){
  return this.http.post(`${environment.api}/refresh`,{},{withCredentials:true});
}

logout(){
  return this.http.post(`${environment.api}/logout`,{},{withCredentials:true});
}

forgot(body :any){
  return this.http.post(`${environment.api}/forgot`,body);
}
reset (body :any){
  return this.http.post(`${environment.api}/reset`,body);
}
}
