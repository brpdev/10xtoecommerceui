import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Lightbox } from 'ngx-lightbox';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone:true,
  imports:[SlickCarouselModule, CommonModule],
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})

export class ImageSliderComponent {

  @ViewChild('slickModal') slickModal: any;
  @Input() slides: any[] = [];
  @Input() thumbnailSlides: any[] = [];
  private _albums: any = [];

  constructor(private lgbox: Lightbox,private sanitizer: DomSanitizer) {
    console.log("==> Start.");
   }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  slickInit(e:any) {
    
  }

  breakpoint(e:any) {
    
  }

  afterChange(e:any) {
    
  }

  beforeChange(e:any) {
    
  }

  open(index: number): void {
    for (let i = 0; i < this.thumbnailSlides.length; i++) {
      const album = {
        src: this.thumbnailSlides[i].img,        
        thumb: this.thumbnailSlides[i].img
     };
     this._albums.push(album);
    }
    this.lgbox.open(this._albums, index);
  }
  openLightbox(imageSrc: string) {
    const album = [
      {
        src: imageSrc,
        thumb: imageSrc // You can use the same image as thumb
      }
    ];
    this.lgbox.open(album, 0);
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    prevArrow: false,
    nextArrow: false
  };

  thumbnailConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.thumbnail-carousel',
    centerMode: false,
    focusOnSelect: true,
    prevArrow: true,
    nextArrow: true
  };


  next() {
    this.slickModal.slickNext();
  }
  
  prev() {
    this.slickModal.slickPrev();
  }
}
