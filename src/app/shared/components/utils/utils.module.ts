import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertErrorComponent } from './alert-error/alert-error.component';
import { RootModule } from 'src/app/core/modules/root.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [AlertErrorComponent],
  imports: [
    CommonModule,
    RootModule,
    MatIconModule
  ],
  exports: [
    AlertErrorComponent
  ]
})
export class UtilsModule { }
