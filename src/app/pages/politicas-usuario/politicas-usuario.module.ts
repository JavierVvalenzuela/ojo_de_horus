import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticasUsuarioPageRoutingModule } from './politicas-usuario-routing.module';

import { PoliticasUsuarioPage } from './politicas-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticasUsuarioPageRoutingModule
  ],
  declarations: [PoliticasUsuarioPage]
})
export class PoliticasUsuarioPageModule {}
