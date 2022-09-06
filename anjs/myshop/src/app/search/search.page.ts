import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public flag:boolean=false;
  constructor(private nav:NavController) { }

  ngOnInit() {
  }

  search()
  {
    this.flag=true;
  }

  goback()
  {
    this.nav.back();
  }
}
