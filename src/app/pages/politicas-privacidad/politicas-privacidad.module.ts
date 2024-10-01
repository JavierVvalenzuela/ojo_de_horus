import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticasPrivacidadPageRoutingModule } from './politicas-privacidad-routing.module';

import { PoliticasPrivacidadPage } from './politicas-privacidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticasPrivacidadPageRoutingModule
  ],
  declarations: [PoliticasPrivacidadPage]
})
export class PoliticasPrivacidadPageModule {}
