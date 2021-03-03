import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RootModule } from 'src/app/core/modules/root.module';
import { FormsModule } from 'src/app/shared/components/forms/forms.module';
import { UtilsModule } from 'src/app/shared/components/utils/utils.module';
import { ListImagesComponent } from './components/list-images/list-images.component';
import { MyImagesComponent } from './components/my-images/my-images.component';
import { SearchImagesComponent } from './components/search-images/search-images.component';
import { ImagesRoutingModule } from './images-routing.module';
import { ImagesComponent } from './pages/images/images.component';

@NgModule({
  declarations: [ImagesComponent, MyImagesComponent, SearchImagesComponent, ListImagesComponent],
  imports: [
    CommonModule,
    RootModule,
    ImagesRoutingModule,
    FormsModule,
    AvatarModule,
    InfiniteScrollModule,
    UtilsModule
  ]
})
export class ImagesModule { }
