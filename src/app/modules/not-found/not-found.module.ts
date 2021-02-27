import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { RootModule } from 'src/app/core/modules/root.module';

@NgModule({
   declarations: [NotFoundComponent],
   imports: [CommonModule, NotFoundRoutingModule, RootModule],
})
export class NotFoundModule { }
