import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class RootFacade {

   constructor(
      // ! Define all states here
   ) { }

   cleanStore() {
      const properties = Object.getOwnPropertyNames(this);
      properties.forEach(p => {
         this[p].cleanStore();
      })
   }

}
