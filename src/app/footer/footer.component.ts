import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  selesEmailId:any;
  constructor() { 
    this.selesEmailId="SALES@DIRECTSECURITYSUPPLY.COM";
  }

  ngOnInit(): void {
  }

}
