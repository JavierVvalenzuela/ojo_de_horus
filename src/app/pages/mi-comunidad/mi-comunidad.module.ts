import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiComunidadPageRoutingModule } from './mi-comunidad-routing.module';

import { MiComunidadPage } from './mi-comunidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiComunidadPageRoutingModule
  ],
  declarations: [MiComunidadPage]
})
export class MiComunidadPageModule {}
