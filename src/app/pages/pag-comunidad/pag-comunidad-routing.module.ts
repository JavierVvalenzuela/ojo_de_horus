import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagComunidadPage } from './pag-comunidad.page';

const routes: Routes = [
  {
    path: '',
    component: PagComunidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagComunidadPageRoutingModule {}
