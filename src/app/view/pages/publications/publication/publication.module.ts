import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationComponent } from './publication.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PublicationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PublicationRoutingModule
  ]
})
export class PublicationModule { }
