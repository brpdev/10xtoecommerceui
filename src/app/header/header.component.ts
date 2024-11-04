import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { environment } from 'src/environments/environment';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ProductService } from '../_services/product.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartServiceService } from '../_services/cart-service.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productCode: string = '';
  IsUserLogin:boolean=false;
  content?: string;
  isdirectsec:any;
  iskyraden:any;
  contactDetails:any;
  trybyUrl:any;
  menuItems:any=[];
  childMenuItem:any=[];
  cartQuantity: number = 0;
  shcart: any;
  cartProduct:any=[];
  imagePath:any="";
  product:any;
  galleryImages:any = [];
  totalAmount:any;
  constructor(private userService: UserService,private productService: ProductService,
    private cdr: ChangeDetectorRef,private route: ActivatedRoute,
    private cart:CartServiceService,private router: Router,
  private tokenStorageService:TokenStorageService) {
    this.isdirectsec=environment.isdirectsec;
    this.iskyraden = environment.iskyraden;
    this.contactDetails="info@metroboltmi.com";
    this.trybyUrl="https://www.metroboltmi.com/industries-served";
    this.imagePath = environment.APIHost;
    this.totalAmount=0.0
   }

  ngOnInit(): void {
    this.getMenuItem();
    this.IsUserLogin= this.tokenStorageService.userLogin();
    this.cart.currentQuantity.subscribe((quantity) => {
      this.cartQuantity = quantity;
      console.log('Cart quantity updated in UI:', this.cartQuantity);
      this.cdr.detectChanges();
    });
    this.route.paramMap.subscribe((params) => {
      const productCode = params.get('productCode');
      this.getProductByProductCode(productCode);
    });
  }

  logout(){
    if(this.IsUserLogin){
      this.tokenStorageService.signOut();
      window.location.href="\home";
    }
    else{
      window.location.href="\login"
    }
  }

  GetChildMenu(parentMenuId:any){
    return this.childMenuItem.filter((item:any)=> item.parentCategory == parentMenuId); 
  }
  showhidecart() {
    if (this.shcart == undefined || this.shcart == 0) {
      this.cartProduct=[];
      this.cart.getCart().subscribe((res:any)=>{
        this.cartProduct=res;
        this.totalAmount =parseFloat( this.cartProduct.reduce((sum:any, item:any) => sum + (item.itemPrice*item.quntity), 0)).toFixed(2);
        this.shcart = 1;
      });
    }
    else {
      this.shcart = 0;
    }
  }
  getMenuItem():void{
    this.userService.GetMenuItem().subscribe((res: any) => {
      console.log(res);
      this.menuItems=[];
      this.childMenuItem=[];
      var items : any=[];
      items = res;
      items.forEach((element:any) => {
        if(element.parentCategory!==0){
          this.childMenuItem.push(element);
        }
        else{
          this.menuItems.push(element);
        }
      });
    });
  }

  getProductByProductCode(productCode:any){
    if (!productCode || productCode.trim() === '') {  // Check if productCode is empty
      console.log('Product code is required');
      return;  // Don't make the API call if product code is empty
    }
    this.product = null;
    this.galleryImages=[];
    this.productService.getItemByItemCode(productCode).subscribe((res:any)=>{
      this.product = res;
      if(this.product != null && this.product != undefined){
        this.router.navigate(['/productDetail',this.product.item_Name,this.product.item_Description]);
        // var path = String(this.imagePath)+String(this.product.imageUrl);
        // this.galleryImages.push({
        //   img: String(this.imagePath)+String(this.product.imageUrl)
        // });
      }
    });
  }
}
