import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationsComponent } from './publications.component';

const routes: Routes = [
  { path: '', component: PublicationsComponent },
  {
    path: ':id',
    loadChildren: () => import('./publication/publication.module').then(m => m.PublicationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationsRoutingModule { }
