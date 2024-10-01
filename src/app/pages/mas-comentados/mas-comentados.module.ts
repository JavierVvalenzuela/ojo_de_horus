import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasComentadosPageRoutingModule } from './mas-comentados-routing.module';

import { MasComentadosPage } from './mas-comentados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasComentadosPageRoutingModule
  ],
  declarations: [MasComentadosPage]
})
export class MasComentadosPageModule {}
