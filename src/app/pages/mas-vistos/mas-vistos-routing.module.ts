import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasVistosPage } from './mas-vistos.page';

const routes: Routes = [
  {
    path: '',
    component: MasVistosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasVistosPageRoutingModule {}
