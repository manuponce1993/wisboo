import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementComponent } from './form-element/form-element.component';
import { ReactiveFormsModule, FormsModule as AngularFormsModule } from '@angular/forms';
import { TextDynamicInputComponent } from './text-input/text-dynamic-input.component';
import { RootModule } from 'src/app/core/modules/root.module';

@NgModule({
   declarations: [
      FormElementComponent,
      TextDynamicInputComponent,
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      AngularFormsModule,
      RootModule
   ],
   exports: [
      FormElementComponent,
      TextDynamicInputComponent,
      ReactiveFormsModule,
   ],
})
export class FormsModule { }
