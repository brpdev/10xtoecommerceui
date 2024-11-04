import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  APIURL:any="";

  constructor(private http: HttpClient) {
    this.APIURL = environment.APIUrl;
   }

   getItemByItemCode(itemCode:any){
    return this.http.get(this.APIURL+"Item/GetItemByItemCode?ItemCode="+itemCode,httpOptions);
   }

   getItemPrice(itemcode:any,qty:any){
    this.http.post(this.APIURL+"Item/GetItemPrice?Itemcode="+itemcode+"&Qty="+qty,httpOptions)
    .subscribe((res:any)=>{
      if(res != undefined && res != null){
        return res.message;
      }else{
        return 0;
      }
    });
   }
   
   getUnit(){
    return this.http.get(this.APIURL+"Item/GetAllUnit",httpOptions);
   }

   PutOrder(order:any){
    return this.http.post(this.APIURL+"Order/SaveOrderDetail",order,httpOptions);
   }
   
   getOrderDetails(orderId:any){
    return this.http.get(this.APIURL+"Order/GetOrderDetail?orderId="+orderId,httpOptions);
   }

   getCurrentUserOrder(customerId:any){
    return this.http.get(this.APIURL+"Order/GetAllOrderDetailByCustomerId?CustomerId="+customerId,httpOptions);
   }

   calculationOfTax(objTax:any){
    return this.http.post(this.APIURL+"Order/CalCulationOfTax",objTax,httpOptions);
   }
   
   orderPayment(objpayment:any){
    return this.http.post(this.APIURL+"Order/PaymentDetail",objpayment,httpOptions);
   }
}
