import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'professional',
    loadChildren: () => import('./view/pages/professional/professional.module').then(m => m.ProfessionalModule)
  },
  {
    path: 'publications',
    loadChildren: () => import('./view/pages/publications/publications.module').then(m => m.PublicationsModule)
  },
  {
    path: 'lecturing',
    loadChildren: () => import('./view/pages/lecturing/lecturing.module').then(m => m.LecturingModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

const routerOptions: ExtraOptions = {
  useHash: true
  /*useHash: false,
  anchorScrolling:'enabled',
  onSameUrlNavigation: 'reload',*/
  /*scrollPositionRestoration: 'enabled',
  scrollOffset: [0, 1024]*/

  /*scrollPositionRestoration: 'enabled', // or 'top'
  anchorScrolling: 'enabled',
  scrollOffset: [0, 65]
  onSameUrlNavigation: 'reload'*/

  //https://stackoverflow.com/questions/39941656/scroll-to-anchor-not-working
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
