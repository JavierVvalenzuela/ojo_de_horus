import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticasPrivacidadPage } from './politicas-privacidad.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticasPrivacidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticasPrivacidadPageRoutingModule {}
