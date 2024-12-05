import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponderPregPage } from './responder-preg.page';

const routes: Routes = [
  {
    path: '',
    component: ResponderPregPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponderPregPageRoutingModule {}
