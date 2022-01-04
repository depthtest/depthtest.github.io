import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturingComponent } from './lecturing.component';

const routes: Routes = [{ path: '', component: LecturingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturingRoutingModule { }
