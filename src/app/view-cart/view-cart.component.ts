import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { CartServiceService } from '../_services/cart-service.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})

export class ViewCartComponent {
  imgeUrl:any="";
  totalAmount:any=0.0;
  isLoggedIn:boolean=true;
  isEmpty:boolean=true;
  quantity: number= 0;
  product:any;
  cartItems: any = [];  // Ensure the type is specified
  refKey: string = 'your-reference-key';  
  availableUnits:any =[]; // Add any units required
  viewUnit:boolean=false;
  constructor( private productService: ProductService,private userService:UserService,
    private router: Router,private cart:CartServiceService,private token:TokenStorageService) {}

  ngOnInit(): void {
    this.imgeUrl = environment.APIHost;
    const IsUnit = this.token.getConfig("UnitCombo");
    if(IsUnit != undefined && IsUnit != null){
      if(IsUnit.includes("false")){
        this.viewUnit = false;
      }else{
        this.viewUnit=true;
      }
    }
    this.getUnit();
   this.getCartDetailsForCart();
  }
  
  getUnit(){
    this.productService.getUnit().subscribe((res:any)=>{
      this.availableUnits = res;
      console.log(this.availableUnits);
    });
  }
  
  increaseQuantity(index: number) {
    if (this.cartItems[index] && this.cartItems[index].quntity !== undefined) {
      console.log("Before increment:", this.cartItems[index].quntity);
      this.cartItems[index].quntity++;
      const item = this.cartItems[index];          // Extract unit
      this.cart.addToCart(item.itemCode,item.quntity,item.item_Description,item.imagePath,item.itemPrice,item.unit);
    }
    this.totalAmount=parseFloat( this.cartItems.reduce((sum:any, item:any) => sum + (item.itemPrice*item.quntity), 0)).toFixed(2);
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index] && this.cartItems[index].quntity > 1) {
        console.log("Before decrement:", this.cartItems[index].quntity);
        this.cartItems[index].quntity--;
        const item = this.cartItems[index];
        this.cart.addToCart(item.itemCode,item.quntity,item.item_Description,item.imagePath,item.itemPrice,item.unit);
    }
    this.totalAmount=parseFloat( this.cartItems.reduce((sum:any, item:any) => sum + (item.itemPrice*item.quntity), 0)).toFixed(2);
  }

  checkout(){
    if(this.token.userLogin()){
      this.router.navigate(['/checkOut']);
    }else{
      this.router.navigate(['/login']);
    }
  }

  removeItem(index: number) {
    var item = this.cartItems[index];
    this.cart.removeFromCart(item.itemCode).subscribe((res:any)=>{
      this.cart.removeItemFromCart(item.itemCode);
      this.cartItems.splice(index, 1);
    });
    this.totalAmount=parseFloat( this.cartItems.reduce((sum:any, item:any) => sum + (item.itemPrice*item.quntity), 0)).toFixed(2);
  }

  getCartDetailsForCart() {
    this.cart.getCart().subscribe(
      (data: any) => {
        this.cartItems = data;  // Now cartItems is properly assigned
        console.log(this.cartItems);
        if(this.cartItems != undefined && this.cartItems != null){
          this.isEmpty=false;
        }
        this.totalAmount=parseFloat( this.cartItems.reduce((sum:any, item:any) => sum + (item.itemPrice*item.quntity), 0)).toFixed(2);
      }
    );
  }

}