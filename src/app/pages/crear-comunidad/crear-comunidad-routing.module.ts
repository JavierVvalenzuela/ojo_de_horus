import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearComunidadPage } from './crear-comunidad.page';

const routes: Routes = [
  {
    path: '',
    component: CrearComunidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearComunidadPageRoutingModule {}
