import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-current-customer-all-order',
  templateUrl: './current-customer-all-order.component.html',
  styleUrl: './current-customer-all-order.component.css'
})
export class CurrentCustomerAllOrderComponent {

  allOrders:any[]=[];
  constructor(private token:TokenStorageService,private userservice:UserService,private product:ProductService){

}
ngOnInit():void{
  const currentCustomerId = this.token.getUserInfo("Customer_Id");
  if(currentCustomerId != undefined && currentCustomerId != null){
    this.getCurretUserAllOrder(currentCustomerId);
  }else{
    window.location.href="\home";
  }
}
getCurretUserAllOrder(customerId:any){
  this.allOrders=[];
  this.product.getCurrentUserOrder(customerId).subscribe((res:any)=>{
    this.allOrders=res;
  });
}
}
