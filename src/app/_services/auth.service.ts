import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.APIUrl + 'User/Login?EmailId='+username+"&password="+password, httpOptions);
  }

  register(UserDetails:any): Observable<any> {
    return this.http.post(environment.APIUrl + 'User/SingUpUser',UserDetails, httpOptions);
  }

  changepassword(user:any):Observable<any>{
    return this.http.post(environment.APIUrl + 'User/ChangePassword',user,httpOptions)
  }
}
