import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ImageSliderComponent } from '../common/image-slider/image-slider.component';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ 
    ProductDetailComponent,      
  ],
  imports: [BrowserModule,
    ImageSliderComponent,
    LightboxModule ,
    FormsModule,
  ],
})
export class ProductDetailModule { }
