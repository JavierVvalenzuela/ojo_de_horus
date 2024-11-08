import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagComunidadPageRoutingModule } from './pag-comunidad-routing.module';

import { PagComunidadPage } from './pag-comunidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagComunidadPageRoutingModule
  ],
  declarations: [PagComunidadPage]
})
export class PagComunidadPageModule {}
