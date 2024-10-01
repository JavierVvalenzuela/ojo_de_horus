import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasPopularesPage } from './mas-populares.page';

const routes: Routes = [
  {
    path: '',
    component: MasPopularesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasPopularesPageRoutingModule {}
