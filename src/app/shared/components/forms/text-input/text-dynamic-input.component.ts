import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormElementComponent } from '../form-element/form-element.component';
import { Observable, timer } from 'rxjs';
import { startWith, map, filter, debounce, tap, switchAll, finalize } from 'rxjs/operators';

@Component({
   selector: 'app-text-dynamic-input',
   templateUrl: './text-dynamic-input.component.html',
   styleUrls: ['./text-dynamic-input.component.scss'],
})
export class TextDynamicInputComponent extends FormElementComponent implements OnInit {
   @Input() loadResources: (value: string) => Observable<any>;
   @Input() maxLength: number;
   @Input() clearable = false;
   @Output() enter = new EventEmitter();

   searchingSpinner: boolean = false
   storedValue: string;

   get formCtrl() {
      return this.form.get(this.name);
   }

   constructor() {
      super();
   }

   ngOnInit() {
      this.formCtrl.valueChanges
         .pipe(
            startWith(''),
            filter((value: string) => !!value && value.length > 2),
            filter((value: string) => value != this.storedValue),
            debounce(value => (value.length > 3) ? timer(500) : timer(2500)),
            tap(_ => this.searchingSpinner = true),
            tap(value => this.storedValue = value),
            map(value => { return this.loadResources(value) }),
            switchAll(),
            finalize(() => { this.searchingSpinner = false }),
         ).subscribe(_ => {
            this.searchingSpinner = false;
         });
   }
}
