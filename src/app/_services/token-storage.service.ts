import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  
  userLogin(){
    const tokenvlaue = this.getToken();
    if(tokenvlaue != undefined && tokenvlaue != null){
      return true;
    }
    else{
      return false;
    }
  }

  getConfig(configName:any){
    const token = this.getToken();
    if(token != undefined && token != null){
      const decodedToken = this.decodeToken(token);
      if (decodedToken) {
        const config= JSON.parse(decodedToken["configDetail"]);
        if(config != undefined && config != null){
          const objArray = config.filter((data:any)=> data.ConfigName == configName);
          if(objArray != undefined && objArray != null){
            return objArray[0].ConfigValue;
          }
          return null;
        }else{
          return null;
        }
      } else{
        return null;
      }
    }else{
      return null;
    }

  }

  getUserInfo(key:string): any {
    const tokenValue = this.getToken();
    if(tokenValue != undefined && tokenValue != null){
      const decodedToken = this.decodeToken(tokenValue);
      if (decodedToken) {
        return decodedToken[key];
      }
    }
    return null;
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
