import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLogin = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  setUserLogin(){
    this.isLogin.next(true);
  }

  userLogin(){
    return this.isLogin.closed;
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  CheckEmail(email:any){
    return this.http.get(environment.APIUrl+"User/CheckEmaiId?emailId="+email,httpOptions);
  }

  GetMenuItem(){
    return this.http.get(environment.APIUrl+"Item/GetItemCategory",httpOptions);
  }
  
  GetCategoryWithNoItem(){
    return this.http.get(environment.APIUrl+"Item/GetItetmWiseCategory",httpOptions);
  }
  GetIdFromCategoryName(categeryName:any){
    return this.http.get(environment.APIUrl+"Item/GetIdFromCategoryName?categoryName="+categeryName,httpOptions);
  }
  GetItemByCategory(categoryId:any){
    return this.http.get(environment.APIUrl+"Item/ItemGetByCategory?categoryId="+categoryId,httpOptions);
  }

  GetCustomerDetails(CustId:any){
    return this.http.get(environment.APIUrl+"Customer/GetCustomerDetails?customerId="+CustId,httpOptions);
  }

  GetloginCustomerInfo(CustID: any) {
    return this.http.get(environment.APIUrl + 'Customer/GetCustomerById?customerId='+CustID, httpOptions);
  }
}
