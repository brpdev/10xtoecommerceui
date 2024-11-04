import { Component, Inject, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ImageSliderComponent } from '../common/image-slider/image-slider.component';
import { CartServiceService } from '../_services/cart-service.service';
import { ToasterService } from '../services/toaster.service';
import { ToastrModule } from 'ngx-toastr';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  quantity: number = 2;
  product:any;
  viewUnit:boolean=false;
  imagePath:any="";
  galleryImages:any = [];
  tabord:any=1;
  objunit:any=[];
  IsLogin:boolean=false;
  @ViewChild('toasterContainer', { read: ViewContainerRef })
  toasterContainer!: ViewContainerRef;

  constructor(private route: ActivatedRoute, private productService: ProductService,private toastera:ToasterService,
    private cart:CartServiceService,private tsmodal:ToastrModule,private token :TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.imagePath=environment.APIHost;
    const IsUnit = this.token.getConfig("UnitCombo");
    if(IsUnit != undefined && IsUnit != null){
      if(IsUnit.includes("false")){
        this.viewUnit = false;
      }else{
        this.viewUnit=true;
      }
    }
    this.getAllUnit();
    this.route.paramMap.subscribe((params) => {
      const productCode = params.get('productCode');
      this.getProductByProductCode(productCode);
    });
  }
  getPrice(itemcode:any,qty:any){
    return this.productService.getItemPrice(itemcode,qty);
  }
  getAllUnit(){
    this.objunit=[];
    this.productService.getUnit().subscribe((res:any)=>{
      this.objunit = res;
      console.log(this.objunit);
    });
  }
  onUnitChange(val:any) {
    
  }
  activetabord(tab:any){
    this.tabord=tab;
      }
  getProductByProductCode(productCode:any){
    this.product = null;
    this.galleryImages=[];
    this.productService.getItemByItemCode(productCode).subscribe((res:any)=>{
      this.product = res;
      if(this.product != null && this.product != undefined){
        var path = String(this.imagePath)+String(this.product.imageUrl);
        this.product.item_Price = this.getPrice(this.product.item_Name,this.quantity);
        this.galleryImages.push({
          img: String(this.imagePath)+String(this.product.imageUrl)
        });
      }
    });
  }

  increment() {
    if (this.quantity < 9999) {
      this.quantity++;
    }
  }

  // Decrement the quantity
  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
  
  // Add to cart function
  addToCart() {
    this.cart.addToCart(this.product.item_Name,this.quantity,this.product.item_Description,this.product.imageUrl,this.product.item_Price,this.product.itemUnit);
   this.toastera.success("Item Added in the Cart."); 
  //alert("Cart Added success");

  }

  
}
