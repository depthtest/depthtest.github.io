import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ProfessionalRoutingModule } from './professional-routing.module';
import { ProfessionalComponent } from './professional.component';


@NgModule({
  declarations: [
    ProfessionalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ProfessionalRoutingModule
  ]
})
export class ProfessionalModule { }
