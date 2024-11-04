import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  content?: string;
  menuItems:any=[];
  childMenuItem:any=[];
  activeCategoryId: number | null = null;
  constructor(private userService: UserService,private productService: ProductService) { 
   
  }

  ngOnInit(): void {
    this.getMenuItem();
  }
  toggleCategory(categoryTranId: number) {
    this.activeCategoryId = this.activeCategoryId === categoryTranId ? null : categoryTranId;
  }
  GetChildMenu(parentMenuId:any){
   // console.log(this.childMenuItem);
    return this.childMenuItem.filter((item:any)=> item.parentCategory == parentMenuId); 
  }

  getMenuItem():void{
    this.userService.GetCategoryWithNoItem().subscribe((res: any) => {
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

 
}
