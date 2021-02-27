import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

const material = [
   MatButtonModule,
   MatTabsModule
];

const flexLayout = [FlexLayoutModule];

@NgModule({
   imports: [material, flexLayout],
   exports: [material, flexLayout],
})
export class RootModule { }
