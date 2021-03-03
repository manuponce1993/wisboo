import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertErrorComponent } from './alert-error/alert-error.component';
import { RootModule } from 'src/app/core/modules/root.module';
import { MatIconModule } from '@angular/material/icon';
import { MainLoadingComponent } from './main-loading/main-loading.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { SearchComponent } from './search/search.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [AlertErrorComponent, MainLoadingComponent, SearchComponent, EmptyComponent],
  imports: [
    CommonModule,
    RootModule,
    MatIconModule,
    LottieModule,
    LottieModule.forRoot({ player: () => player }),
  ],
  exports: [
    AlertErrorComponent,
    MainLoadingComponent,
    SearchComponent,
    EmptyComponent
  ]
})
export class UtilsModule { }
