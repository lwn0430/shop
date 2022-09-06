import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdetailPage } from './pdetail.page';

const routes: Routes = [
  {
    path: '',
    component: PdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdetailPageRoutingModule {}
