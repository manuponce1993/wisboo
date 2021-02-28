import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Image } from 'src/app/shared/models/image';
import { BaseState } from './base.state';

@Injectable({
   providedIn: 'root',
})
export class ImagesState extends BaseState {

   store = {
      images$: new BehaviorSubject<Image[]>([]),
      orders$: new BehaviorSubject<Image[]>(null),
      loadingGettingImages$: new BehaviorSubject<boolean>(false),
      metaDataImages$: new BehaviorSubject<any>(null),
   };

   constructor() {
      super();
   }

   getImages$(): Observable<any> {
      return this.store.images$.asObservable();
   }

   isLoadingGettingImages$() {
      return this.store.loadingGettingImages$.asObservable();
   }

   setLoadingGettingImages(loading: boolean) {
      this.store.loadingGettingImages$.next(loading);
   }

   getMetaDataImages$(): Observable<any> {
      return this.store.metaDataImages$.asObservable();
   }

   setMetaDataImages(metaDataImages: any) {
      this.store.metaDataImages$.next(metaDataImages);
   }

   addImages(_images: Image[]) {
      let images = this.store.images$.getValue();
      if (Array.isArray(images) && Array.isArray(_images)) {
         images = images.concat(_images);
         this.store.images$.next([...images]);
      }
   }

   setImages(_images: Image[]) {
      if (Array.isArray(_images)) {
         this.store.images$.next([..._images]);
      }
   }
}
