import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasPopularesPageRoutingModule } from './mas-populares-routing.module';

import { MasPopularesPage } from './mas-populares.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasPopularesPageRoutingModule
  ],
  declarations: [MasPopularesPage]
})
export class MasPopularesPageModule {}
