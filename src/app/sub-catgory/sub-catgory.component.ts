import { AbstractType, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductService } from '../_services/product.service';
import { CartServiceService } from '../_services/cart-service.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-sub-catgory',
  templateUrl: './sub-catgory.component.html',
  styleUrls: ['./sub-catgory.component.css']
})
export class SubCatgoryComponent implements OnInit {

  SaFilterLable: any;
  parentCategoryId: any;
  childMenuItems: any[] = [];
  menuItems: any[] = []; // Array to hold parent menu items
  childMenuItem: any[] = []; // Array to hold all child menu items
  Items:any[]=[];
  setopenview: any = '0';
  showsafilter: any = '1';
  showsafilter1: any = '1';
  LowestPriceFirst: any;
  highestPriceFirst: any;
  ItemAtoZ: any;
  ItemZtoA: any;
  ListTypeView:any='1';
  TableView:any='0';
  itlable:any;
  LowestQtyFirst: any;
  highestQtyFirst: any;
  descrAtoZ: any;
  descrZtoA: any;
  QuantitySort: any;
  DimensionLable:any;
  Sequencelable:any;
  sa13sortasc:any;
  sa13sortdesc:any;
  newestfirstsortlabel:any;
  isListView:any='1';
  objcategory:any=0;
  mancategory:any;
  txtCategory:any="";
  imagePath:any="";
  quantity: number = 2;
  product:any;
  objunit:any=[];
  IsLogin:boolean=false;
  viewUnit:boolean=false;
  selectedUnit:any="";
  constructor(private route: ActivatedRoute, private userService: UserService,
    private productservice:ProductService,private cart:CartServiceService,private token:TokenStorageService) {}

  async ngOnInit() {
    this.itlable="Product Name :"
    this.mancategory=null;
    this.imagePath =environment.APIHost;
    this.SaFilterLable="Child Category"
    this.IsLogin = this.userService.userLogin();

    const IsUnit = this.token.getConfig("UnitCombo");
    if(IsUnit != undefined && IsUnit != null){
      if(IsUnit.includes("false")){
        this.viewUnit = false;
      }else{
        this.viewUnit=true;
      }
    }

   await this.route.paramMap.subscribe((params) => {
      const categoryTranId = params.get('categoryTranId');
      if(isNaN(Number(categoryTranId))){
        this.getIdFromCategoryName(categoryTranId);
      }else{
        this.getMenuItem(categoryTranId); // Fetch all menu items when the component initializes
      }
    });
    this.getAllUnit();
  }

 getChildMenu(parentMenuId: any) {
  if(Number(parentMenuId)===0){
    this.childMenuItems =this.menuItems;
  }
  else{
    this.childMenuItems = this.childMenuItem.filter((item: any) => item.parentCategory === Number(parentMenuId));
  }
    console.log('Filtered Child Menu Items:', this.childMenuItems); // Log filtered child menu items
}
setlistview(listvi :any) {
  this.isListView = listvi;
}

getItemFromAPI(categoryId:any){
  if(categoryId != undefined || categoryId != null || Number(categoryId)>0){
    this.Items=[];
    this.userService.GetItemByCategory(categoryId).subscribe((res:any)=>{
      res.forEach((element: any) => {
        this.Items.push(element);   
      });
      console.log(this.Items);
    });
  }
}

getsetopenview(listvi:any) {

  listvi = (listvi == '1' ? '0' : '1');
  this.setopenview = listvi;
  //$("#Filters").slideToggle("slow");
}

lowestFirst() {
    this.Items.sort((a,b) => 0 - (a.item_Price > b.item_Price ? -1 : 1));
    this.Items.sort((a,b) => 0 - (a.item_Price > b.item_Price ? -1 : 1));
}
highestFirst() {
  this.Items.sort((a,b) => 0 - (a.item_Price > b.item_Price ? 1 : -1));
}
AtoZ(){
  this.Items.sort();
}

getCurrentCategory(){
  console.log("Current Category Id == "+ this.objcategory);
  this.mancategory = this.menuItems.filter((x:any)=> x.categoryTranId==this.objcategory)[0];
  if(this.mancategory == null || this.mancategory == undefined ){
    this.mancategory = this.childMenuItem.filter((x:any)=> x.categoryTranId==this.objcategory)[0];
    this.txtCategory = this.mancategory.category;
  } else{
    this.txtCategory = this.mancategory.category;
  }
  console.log(this.mancategory);
}

  getIdFromCategoryName(categeryName:any){
  this.userService.GetIdFromCategoryName(categeryName).subscribe((res:any)=>{
    var Id =res.message;
    if(Number(Id)){
      this.objcategory =Id;
      this.getMenuItem(Id);
    }
  });
}
  // Method to fetch menu items from the service
  async getMenuItem(categoryId:any) {
    this.userService.GetMenuItem().subscribe((res: any) => {
      console.log('API Response:', res); // Log the API response
      this.menuItems = [];
      this.childMenuItem = [];
      
      res.forEach((element: any) => {
        if (element.parentCategory !== 0) {
          this.childMenuItem.push(element); // Push to child menu items array
        } else {
          this.menuItems.push(element); // Push to parent menu items array
        }
      });
      
      this.objcategory=categoryId; 
      if (this.objcategory) {
        this.getChildMenu(this.objcategory); 
        this.getItemFromAPI(this.objcategory);
      }
      this.getCurrentCategory();
    }, (error) => {
      console.error('Error fetching menu items:', error); // Handle error
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
  addToCart(item_Name:any) {
    var item = this.Items.filter((item:any)=> item.item_Name==item_Name)[0];
    this.cart.addToCart(item_Name,this.quantity,item.item_Description,item.imageUrl,item.item_Price,this.selectedUnit); 
  }
  

  getAllUnit(){
    this.objunit=[];
    this.productservice.getUnit().subscribe((res:any)=>{
      this.objunit = res;
      console.log(this.objunit);
    });
  }
}

