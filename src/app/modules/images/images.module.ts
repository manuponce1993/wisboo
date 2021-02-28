import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './pages/images/images.component';
import { MyImagesComponent } from './components/my-images/my-images.component';
import { ImagesListComponent } from './components/images-list/images-list.component';
import { ImagesRoutingModule } from './images-routing.module';
import { RootModule } from 'src/app/core/modules/root.module';
import { FormsModule } from 'src/app/shared/components/forms/forms.module';

@NgModule({
  declarations: [ImagesComponent, MyImagesComponent, ImagesListComponent],
  imports: [
    CommonModule,
    RootModule,
    ImagesRoutingModule,
    FormsModule
  ]
})
export class ImagesModule { }
