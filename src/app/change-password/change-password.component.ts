import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    Conformpassword:null
  };
  errorMessage = '';
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const { username, password,Conformpassword } = this.form;
    var UserDetails:any={};
    UserDetails.UserEmailId=username;
    UserDetails.password=password;
    this.authService.changepassword(UserDetails).subscribe({
      next: data => {
        var message = data.message;
        if(message==="Password changed."){
          window.location.href="login";
        }
        else{
          window.location.reload();
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }
}
