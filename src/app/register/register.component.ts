import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { state } from '@angular/animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    FirstName:null,
    LastName :null,
    email: null,
    phoneNumber:null,
    password: null,
    iscustomer: false,
    customerid:0,
    State:null,
    City:null,
    Contry:null,
    postalCode:null,
    ConfirmPassword:null,
    comapnyName:null,
    Address1:null,
    Address2:null,
  };
  isvalidateemail:boolean=true;
  hide1:boolean = true;
  isShowMsg: boolean = true;
  returnmsg: string="";
  isShowMsg1:boolean=false;
  confirmPass:boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  iscustomeridValidation: boolean = false;
  RegistrationLable:any;
  constructor(private authService: AuthService,private userservice : UserService) { }

  ngOnInit(): void {
    this.RegistrationLable="Account Registration";
  }
  checkcustomer(){
    if (this.form.customerid != undefined && this.form.customerid != null && this.form.customerid != '') {
      this.userservice.GetloginCustomerInfo(this.form.customerid).subscribe((res: any) => {
        if (res != undefined && res != null) {
          this.form.FirstName=res.firstName;
          this.form.LastName=res.lastName;
          this.form.email=res.email;
          this.form.phoneNumber=res.phone;
          this.iscustomeridValidation = true;
        }
        else
        {
          this.form.customerid = 0;
          this.iscustomeridValidation = false;
          alert('Customer Account Inactive!  Please contact the Customer Account Specialists at 1-800-448-0406 option 4.')
        }
      });
    }
  }
 
  checkemail(emailId:any):void{
    this.userservice.CheckEmail(emailId).subscribe((res:any)=>{
      if(res.message=="false")
      {
        this.isvalidateemail == false;
      }
      else {
        this.isvalidateemail == true;
      }
    });
  }

  onSubmit(): void {
    const { FirstName,
      LastName,
      email,
      phoneNumber,
      password,
      iscustomer,
      customerid,
      State,
      City,
      Contry,
      postalCode,
      ConfirmPassword,
      comapnyName,
      Address1,
      Address2,
     } = this.form;
    var UserDetails:any={};
    UserDetails.FirstName=FirstName;
    UserDetails.LastName=LastName;
    UserDetails.Phone=phoneNumber;
    UserDetails.emailId=email;
    UserDetails.password=password;
    UserDetails.companyName= comapnyName;
    UserDetails.Address1 = Address1;
    UserDetails.Address2=Address2;
    UserDetails.City=City;
    UserDetails.Country=Contry;
    UserDetails.state = State;
    UserDetails.zipCode = postalCode;
    this.authService.register(UserDetails).subscribe({
      next: data => {
        console.log(data);
        if(data.message == "EmailId already exists into the system."){
            alert(data.message);
            this.isSuccessful = false;
            this.isSignUpFailed = true;
          }
        else{
          window.location.href="login";
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
