import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/model/user.model';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
    
  public login = (email:string, password:string ) => {
      return this.http.post<any>('http://localhost:3090/signin', {email, password})
      .pipe(tap(res => this.setSession(res)))
      .pipe(shareReplay());          
  }

  private setSession = (authResult) => {
    const expiresAt = moment().add(200000,'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }   
  
  public logout = () => {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn = () => {
      const isLogged =  moment().isBefore(this.getExpiration());
      return isLogged;
  }

  public isLoggedOut = () => {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }   
}
