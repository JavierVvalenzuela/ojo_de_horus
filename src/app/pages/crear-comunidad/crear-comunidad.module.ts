import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearComunidadPageRoutingModule } from './crear-comunidad-routing.module';

import { CrearComunidadPage } from './crear-comunidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearComunidadPageRoutingModule
  ],
  declarations: [CrearComunidadPage]
})
export class CrearComunidadPageModule {}
