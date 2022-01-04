import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LecturingRoutingModule } from './lecturing-routing.module';
import { LecturingComponent } from './lecturing.component';


@NgModule({
  declarations: [
    LecturingComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LecturingRoutingModule
  ]
})
export class LecturingModule { }
