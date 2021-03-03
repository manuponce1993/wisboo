import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Image } from 'src/app/shared/models/image';
import { BaseState } from './base.state';

@Injectable({
   providedIn: 'root',
})
export class ImagesState extends BaseState {

   // Properties of the Images store to be persisted 
   store = {
      images$: new BehaviorSubject<Image[]>([]),
      myImages$: new BehaviorSubject<Image[]>([]),
      loadingGettingImages$: new BehaviorSubject<boolean>(false),
      loadingGettingMyImages$: new BehaviorSubject<boolean>(false),
      metaDataImages$: new BehaviorSubject<any>(null),
      metaDataMyImages$: new BehaviorSubject<any>(null),
   };

   constructor() {
      super();
   }

   // ** Images List

   /**
    * * Returns an Observable that emits values [Image[]] each time Images store is updated
    */
   getImages$(): Observable<Image[]> {
      return this.store.images$.asObservable();
   }

   /**
    * Add images [Image[]] to the Images Store array
    * @param _images: [Image[]] Images to be added 
    */
   addImages(_images: Image[]) {
      let images = this.store.images$.getValue();
      if (Array.isArray(images) && Array.isArray(_images)) {
         images = images.concat(_images);
         this.store.images$.next([...images]);
      }
   }

   /**
    * Set images [Image[]] to the Images Store array
    * @param _images: [Image[]] Images to be set 
    */
   setImages(_images: Image[]) {
      if (Array.isArray(_images)) {
         this.store.images$.next([..._images]);
      }
   }

   /**
    * Update image [Image[]] (mapped by id) from the Images Store
    * @param _image: [Image] Image to be updated
    */
   updateImage(_image: Image) {
      const images: Image[] = this.store.images$.value;
      const imageIndex = images.findIndex(image => image.id === _image.id);
      if (imageIndex != -1) {
         images[imageIndex] = { ..._image };
         this.store.images$.next([...images]);
      }
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

   // ** My Images

   /**
    * * Returns an Observable that emits values [Image[]] each time MyImages store is updated
    */
   getMyImages$(): Observable<any> {
      return this.store.myImages$.asObservable();
   }

   /**
    * Add image [Image] to the MyImages Store array
    * @param _images: [Image] Image to be added 
    */
   addMyImage(_image: Image) {
      let images = this.store.myImages$.getValue();
      if (!images.some(image => image.id == _image.id)) {
         images.push(_image);
         this.store.myImages$.next([...images]);
      }
   }

   /**
    * Remove image [Image] (if exists) from the MyImages Store array
    * @param _images: [Image] Image to be added 
    */
   removeMyImage(_image: Image) {
      const images = this.store.myImages$.getValue();
      const imageIndex = images.findIndex(image => image.id == _image.id);
      if (imageIndex != -1) {
         images.splice(imageIndex, 1);
         this.store.myImages$.next([...images]);
      }
   }

   /**
    * Set images [Image[]] to the MyImages Store array
    * @param _images: [Image] Image to be added 
    */
   setMyImages(_images: Image[]) {
      if (Array.isArray(_images)) {
         this.store.myImages$.next([..._images]);
      }
   }

   isLoadingGettingMyImages$() {
      return this.store.loadingGettingMyImages$.asObservable();
   }

   setLoadingGettingMyImages(loading: boolean) {
      this.store.loadingGettingMyImages$.next(loading);
   }

   getMetaDataMyImages$(): Observable<any> {
      return this.store.metaDataMyImages$.asObservable();
   }

   setMetaDataMyImages(metaDataImages: any) {
      this.store.metaDataMyImages$.next(metaDataImages);
   }
}
