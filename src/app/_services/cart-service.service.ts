import { Injectable } from '@angular/core';
import { Itemobj } from './itemobj.model';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})

export class CartServiceService {
  APIURL:any="";
  private guid:any;
  private cartDetails:Itemobj[]= [];
  private cartQuantity = new BehaviorSubject<number>(0);
  currentQuantity = this.cartQuantity.asObservable();

  constructor(private http: HttpClient,private toastr: ToastrService,) {
    this.APIURL = environment.APIUrl;
   }

  getGUID(){
    return this.guid;
  }

  createGUid(){
    this.guid = uuidv4();
  }

  getTotalQty(){
    return parseFloat( this.cartDetails.reduce((sum:any, item:any) => sum + (item.itemPrice*item.qty), 0)).toFixed(2);
  }

  updateQtyInCart(item_code:any,Qty:Number){
    var item = this.cartDetails.filter((x:any)=> x.itemCode==item_code)[0];
    if(item != undefined || item != null){
      let objQty = item.qty; 
      item.qty = (Number(objQty)-Number(Qty));
    }
  }

  removeItemFromCart(item_code:any){
    const index = this.cartDetails.findIndex(item => item.itemCode === item_code);

    if (index > -1) {
      this.cartDetails.splice(index, 1);  // Remove the item from the array
      let totalQty=parseFloat( this.cartDetails.reduce((sum:any, item:any) => sum + (item.qty), 0)).toFixed(2);
      this.cartQuantity.next(Number( totalQty));
    }

  }

  addToCart(item_Code: any, Qty: number, itemdesc: any, img: any, price: any, unit: any) {
    // Check if the GUID is undefined or null
    if (this.guid === undefined || this.guid === null) {
      this.createGUid();
    }
  
    var currentGuid = this.getGUID();
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    // Make the HTTP request
    this.http.put(this.APIURL + "Item/AddItemInCart?Item_Code=" + item_Code + "&quntity=" + Qty + "&refkey=" + currentGuid + "&unit=" + unit, httpOptions)
      .subscribe((res: any) => {
        if (res.message.includes("Record add")) {
          //console.log("Record added.");
          // Show success toaster
          //this.toastr.success('Item added to cart!', 'Success');
        } else {
          console.log("Record not added.");
          // Optionally show an error toaster if something goes wrong
          this.toastr.error('Failed to add item to cart.', 'Error');
        }
      });
  
    // Find the item in the cart
    var item = this.cartDetails.find((x: any) => x.itemCode == item_Code);
    if (item) {
      item.imgpath = img;
      item.itemdes = itemdesc;
      item.qty = Qty;
      item.itemprice = price;
    } else {
      this.cartDetails.push({
        itemCode: item_Code,
        itemdes: itemdesc,
        qty: Qty,
        imgpath: img,
        itemprice: price
      });
    }
  
    // Calculate total quantity and update cart quantity
    let totalQty = parseFloat(this.cartDetails.reduce((sum: any, item: any) => sum + item.qty, 0)).toFixed(2);
    this.cartQuantity.next(Number(totalQty));
  }
  
  
  getCart(){
    var GUIID = this.getGUID();
    return this.http.get(this.APIURL+"Item/GetCartItem?refKey="+GUIID,httpOptions);
  }

  removeFromCart(itemCode:any){
    var GUIID = this.getGUID();
    return this.http.delete(this.APIURL+"Item/DeleteFromCart?ItemCode="+itemCode+"&refKey="+GUIID,httpOptions);
  }

  CheckcartItem(){
    return this.cartQuantity.value > 0 ?true:false;
  }
}
