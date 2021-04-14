import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PkCalendarViewComponent } from './pk-calendar-view/pk-calendar-view.component';

@NgModule({
  imports: [
    CommonModule, IonicModule
  ],
  declarations: [PkCalendarViewComponent],
  exports: [
    PkCalendarViewComponent
  ]
})
export class PkCalendarViewModule { }
