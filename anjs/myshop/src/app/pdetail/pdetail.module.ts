import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdetailPageRoutingModule } from './pdetail-routing.module';

import { PdetailPage } from './pdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdetailPageRoutingModule
  ],
  declarations: [PdetailPage]
})
export class PdetailPageModule {}
