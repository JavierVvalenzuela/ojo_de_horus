import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticasUsuarioPage } from './politicas-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticasUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticasUsuarioPageRoutingModule {}
