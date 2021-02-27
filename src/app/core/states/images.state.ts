import { Injectable } from '@angular/core';
import { BaseState } from './base.state';

@Injectable({
   providedIn: 'root',
})
export class AttentionsState extends BaseState {

   store = {
      // TODO: Define store props
   };

   constructor() {
      super();
   }
}
