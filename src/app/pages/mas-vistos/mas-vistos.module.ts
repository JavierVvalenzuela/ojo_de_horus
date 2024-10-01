import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasVistosPageRoutingModule } from './mas-vistos-routing.module';

import { MasVistosPage } from './mas-vistos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasVistosPageRoutingModule
  ],
  declarations: [MasVistosPage]
})
export class MasVistosPageModule {}
