import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GetdataService } from '../services/getdata.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild("slide1") slide1;
  public slidelist:any=[];
  public slides:any={};
  public hotlist:any=[];
  public plist:any=[];
  public config:any={};
  constructor(private nav:NavController,private gdata:GetdataService) {
    this.config = this.gdata.config;
    this.slides={
      speed:4000,
      autoplay:{
        delay:3000,
      },
      loop:true
    };
    
    
  }
  ngOnInit()
  {
    this.getSlides();
    this.getHotlist();
    this.getProductList();
  }

  getSlides()
  {
    let api = 'shop/api/focus.php';
    this.gdata.getApiData(api).then((response:any)=>{
      this.slidelist = response.result;
      console.log(this.slidelist);
    });
  }

  getHotlist()
  {
    let api = 'shop/api/photlist.php';
    this.gdata.getApiData(api).then((response:any)=>{
      this.hotlist = response.result;
    });
  }

  getProductList()
  {
    let api = 'shop/api/plist.php';
    this.gdata.getApiData(api).then((response:any)=>{
      this.plist = response.result;
    });
  }
  SlideTouchEnd()
  {
    this.slide1.startAutoplay();
  }

  gosearch()
  {
    this.nav.navigateForward('/search');
  }
}
