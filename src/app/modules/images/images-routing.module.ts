import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './pages/images/images.component';

const routes: Routes = [
   {
      path: '',
      component: ImagesComponent
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class ImagesRoutingModule { }
