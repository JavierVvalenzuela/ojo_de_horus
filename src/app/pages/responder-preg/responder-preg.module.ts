import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponderPregPageRoutingModule } from './responder-preg-routing.module';

import { ResponderPregPage } from './responder-preg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponderPregPageRoutingModule
  ],
  declarations: [ResponderPregPage]
})
export class ResponderPregPageModule {}
