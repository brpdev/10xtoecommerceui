import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/_services/cart-service.service';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { environment } from 'src/environments/environment';
import * as html2pdf from 'html2pdf.js';
import { ActiveToast } from 'ngx-toastr';

@Component({
  selector: 'app-revieworder',
  templateUrl: './revieworder.component.html',
  styleUrl: './revieworder.component.css'
})
export class RevieworderComponent {
  handler:any = null;
  objproduct:any[]=[];
  objTaxt:any;
  orderId:any=0;
  myorder:any="";
  billTo = {
    name: 'John Doe',
    address: '123 Main Street, City, Country',
    phone: '(123) 456-7890',
    fax: '(123) 456-7891'
  };

  shipTo = {
    name: 'Jane Doe',
    address: '456 Oak Street, City, Country',
    phone: '(123) 654-0987',
    fax: '(123) 654-0986'
  };


  orderDetails = {
    cancelDate: '2024-10-21',
    jobRelease: 'Released',
    phone: '(123) 456-7890',
    poNumber: 'PO12345',
    emailAddress: 'customer@example.com',
    paymentType: 'Credit Card',
    shipVia: 'FedEx',
    shippingAccount: '1234567890',
    additionalInfo: 'Leave at front door if no one is home',
    contact: 'John Doe',
    enteredBy: 'Admin'
  };

  products:any[] = [];

  agreeTerms = false;

    orderSummary = {
        subtotal: 250.00,
        rebate: 20.00,
        tax: 15.00,
        total: 245.00 // Total calculation can also be dynamic.
    };
    imagePath:any;
    constructor(private route: ActivatedRoute,private cart:CartServiceService,private userservice:UserService,
      private token:TokenStorageService,private router: Router,
      private productservice:ProductService,private toastera:ToasterService){}

      ngOnInit(): void {
        this.imagePath=environment.APIHost;
        this.route.paramMap.subscribe((params) => {
          const orderId = params.get('order');
          this.myorder = orderId;
          this.getOrderDetails(orderId);
        });
      }
      getOrderDetails(orderId:any){
        this.productservice.getOrderDetails(orderId).subscribe((res:any)=>{
          console.log(res);
          if(res != undefined && res != null){
            this.objproduct=[];
            this.objTaxt;
            this.orderId = res[0].id;
            const productDetails = res[0].orderDetails;
            var subTotal =0;
            this.products=[];
            productDetails.forEach((element:any) => {
              this.products.push({
                image: String(this.imagePath)+String(element.imgPath),
                name: String(element.itemCode)+" "+String(element.itemDesc),
                quantity: element.qty,
                unitPrice: element.itemPrice,
                total: Number(element.qty)*Number(element.itemPrice)
              });
              this.objproduct.push({
                product_tax_code:element.ItemCode,
                unit_price:element.itemPrice,
                quantity:element.qty,
              });
              subTotal= subTotal+(Number(element.qty)*Number(element.itemPrice));
            });
            this.getCustomerDetails(res[0].customerId);
            const dtOrder = res[0].orderDate.substr(0,10);
            this.orderDetails.cancelDate = dtOrder;
            this.orderDetails.additionalInfo="Leave at front door if no one is home";
            this.orderDetails.phone=res[0].customer.phone;
            this.orderDetails.emailAddress= res[0].customer.email;
            this.orderDetails.contact = res[0].customer.firstName;

            this.orderSummary.subtotal = subTotal;
            this.orderSummary.rebate =0;
          }
        });
      }
      calCulateTax(){
        this.productservice.calculationOfTax(this.objTaxt).subscribe((res:any)=>{
          if(res != undefined && res != null){
            console.log(res);
            var sumAmt =0;
            this.products.forEach((ele:any)=>{
              sumAmt = sumAmt + Number(ele.total);
            });
            this.orderSummary.subtotal = Number(sumAmt);
            this.orderSummary.tax = Number(res.amount);
            this.orderSummary.total = (Number(this.orderSummary.subtotal) + Number(this.orderSummary.tax)) -  Number(this.orderSummary.rebate);
          }
        });        

      }
      getCustomerDetails(customerId:any){
        this.userservice.GetCustomerDetails(customerId).subscribe((res:any)=>{
          if(res != undefined && res != null){
            const addressDetails = res[0].shipingLocation[0];
            const shipviaaddress = res[0].shipAddresses[0];
              this.objTaxt={
                from_country:addressDetails.country,
                from_zip:"73001",
                from_state:addressDetails.state,
                from_city:addressDetails.city,
                to_country:shipviaaddress.country,
                to_zip:shipviaaddress.postal,
                to_state:shipviaaddress.state,
                to_city:shipviaaddress.city,
                amount:this.orderSummary.total,
                shipping:"0.1",
                line_items:this.objproduct
              };
              this.billTo.name=res[0].customerMaster.firstName;
              const address= addressDetails.address1
              +" "+addressDetails.address2+" ,"+addressDetails.address3+" , "
              + addressDetails.city+" ,"+addressDetails.country+","
              +addressDetails.state;
              this.billTo.address = address;
              this.billTo.phone = addressDetails.phone;
              this.billTo.fax="";
              this.shipTo.address=shipviaaddress.address1
              +" "+shipviaaddress.address2+" ,"+shipviaaddress.address3+" , "
              + shipviaaddress.city+" ,"+shipviaaddress.country+","
              +shipviaaddress.state;
              this.shipTo.name = shipviaaddress.name;
              this.shipTo.phone = shipviaaddress.phone;
              this.shipTo.fax="";
              this.calCulateTax();
          }
        });
      }

      CreatePDfFile(){
        const element = document.getElementById('content-to-print');

        // Set PDF options
        const options = {
          margin:       1,
          filename:     this.myorder+'.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'a4', orientation: 'L' }
        };

        // Generate PDF
        html2pdf().from(element).set(options).save();
      }
    submitOrder() {
      // Code to submit the order
      var handler = (<any>window).StripeCheckout.configure({
        key: environment.stripKey,
        locale: 'auto',
        token: (token: any)=> {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          this.paymentToken(token);
        }
      });
      handler.open({
        name: 'Stripe Payment',
        description: '2 widgets',
        amount: this.orderSummary.total * 100
      });
      this.toastera.success("Payment Process");
      console.log("Order submitted!");
  }
 paymentToken(token:any){
    console.log(token);
    const tvalue = token;
    let objstr = JSON.stringify(token);
    var objPaymentDetails={
      id: 0,
      orderId: this.orderId,
      amount: this.orderSummary.total,
      paymentThrow: tvalue.card.brand,
      cardNumber: tvalue.card.last4,
      cvcCheck: String(tvalue.card.cvc_check),
      expMonth: String(tvalue.card.exp_month),
      expYear:  String(tvalue.card.exp_year),
      funding: tvalue.card.funding,
      last4: tvalue.card.last4,
      emailId: tvalue.email,
      clientIp: tvalue.client_ip,
      tokenValue: objstr
    }
    this.CreatePDfFile();
    console.log(objPaymentDetails)
    this.productservice.orderPayment(objPaymentDetails).subscribe((res:any)=>{
      if(res != undefined && res != null){
        if(res.message == "Payment succ."){
          this.toastera.success("Payment done.");
          this.toastera.success('Payment done.', 'Order status').finally(()=>{
            window.location.href="/allOrder";
          });
        }else{
          this.toastera.error(res.message);
        }

      }
    })
  }

  loadStripe() {
   
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51QE6A0P4RbfVfKlDD0Bq0jlSohA86fkTHmKicfJsUizrG04ApyKhv9JTfkJxkK4Is5Y81KxpKCkBFrnsiz8SR3xp00rV2HCz5g',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
  modifyOrder() {
      // Code to modify the order
      console.log("Order modification initiated!");
  }
}
