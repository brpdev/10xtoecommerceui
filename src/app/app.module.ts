import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SubCatgoryComponent } from './sub-catgory/sub-catgory.component';
import { ItemcatwiseComponent } from './itemcatwise/itemcatwise.component';
import { RevieworderComponent } from 'src/revieworder/revieworder.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from './services/toaster.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Import standalone components
import { CheckoutComponent } from './checkout/checkout.component';
import { ImageSliderComponent } from './common/image-slider/image-slider.component';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { CurrentCustomerAllOrderComponent } from './current-customer-all-order/current-customer-all-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    SubCatgoryComponent,
    ItemcatwiseComponent,
    RevieworderComponent,
    ViewCartComponent,
    CurrentCustomerAllOrderComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductDetailModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot(),
    FormsModule,
    // Import standalone components
    CheckoutComponent,
    ImageSliderComponent,
    AddressDialogComponent
  ],
  providers: [authInterceptorProviders, ToasterService, provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {}
