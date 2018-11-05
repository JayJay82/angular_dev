import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/model/user.model';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from "moment";

const SIGN_IN_API : string  = "http://localhost:3090/signin";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {}
    
  public login = (email:string, password:string ) => {
      return this.http.post<any>(SIGN_IN_API, {email, password})
      .pipe(tap(res => this.setSession(res)))
      .pipe(shareReplay());          
  }

  private setSession = (authResult) => {
    const expiresAt = moment().add(200000,'second');
    this.localStorage.setItem('id_token', authResult.token);
    this.localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }   
  
  public logout = () => {
      this.localStorage.removeItem("id_token");
      this.localStorage.removeItem("expires_at");
  }

  public isLoggedIn = () => {
      const isLogged =  moment().isBefore(this.getExpiration());
      return isLogged;
  }

  public isLoggedOut = () => {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = this.localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }   
}
