import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class GeneralService {
   public sideNavState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

   constructor(
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
   ) { }

   addIcon(nameIcon: string, fileName: string) {
      this.matIconRegistry.addSvgIcon(
         nameIcon,
         this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/' + fileName)
      )
   }

   sanitizeUrl(url) {
      return this.domSanitizer.bypassSecurityTrustUrl(url);
   }
}
