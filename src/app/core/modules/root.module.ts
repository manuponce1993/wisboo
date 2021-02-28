import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

const material = [
   MatButtonModule,
   MatTabsModule,
   MatIconModule,
   MatSnackBarModule,
   MatFormFieldModule,
   MatInputModule,
   ReactiveFormsModule
];

const flexLayout = [FlexLayoutModule];

@NgModule({
   imports: [material, flexLayout],
   exports: [material, flexLayout],
})
export class RootModule { }
