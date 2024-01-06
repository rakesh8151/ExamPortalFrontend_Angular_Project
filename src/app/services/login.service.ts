import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject= new Subject<boolean>;
  constructor(private http: HttpClient) { }

  //current login user
  public getCurrentUser(){
    return this.http.get(baseUrl+"/current-user");
  }

  //generate token

  public generateToken(loginData: any) {
    return this.http.post(baseUrl + "/generate-token", loginData);
  }

  // login user: set token in localStorage

  public loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  //isLogin : user is logged in or not

  public isLoggedIn(){
    let token= localStorage.getItem("token");
    if(token==undefined || token==''|| token==null){
      return false;
    }else{
      return true;
    }
    
  }

  //logout: remove token from local storage

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  // get token

  public getToken(){
    return localStorage.getItem("token");
  }

  // set userDetails

  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }
  //getUser

  public getUser(){
    let user=localStorage.getItem("user");
    if(user!=null){
      return JSON.parse(user);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
