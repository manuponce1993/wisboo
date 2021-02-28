import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
   selector: 'app-alert-error',
   templateUrl: './alert-error.component.html',
   styleUrls: ['./alert-error.component.scss'],
})
export class AlertErrorComponent implements OnInit {
   message: string;
   constructor(
      @Inject(MAT_SNACK_BAR_DATA)
      public data: any,
   ) {
      this.message = data.message;
   }

   ngOnInit() { }
}
