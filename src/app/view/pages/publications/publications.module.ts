import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PublicationsRoutingModule } from './publications-routing.module';
import { PublicationsComponent } from './publications.component';
import { GeneralViewComponent } from './general-view/general-view.component';


@NgModule({
  declarations: [
    PublicationsComponent,
    GeneralViewComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PublicationsRoutingModule
  ]
})
export class PublicationsModule { }
