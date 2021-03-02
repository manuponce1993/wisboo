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
      myImages$: new BehaviorSubject<Image[]>([]),
      loadingGettingImages$: new BehaviorSubject<boolean>(false),
      loadingGettingMyImages$: new BehaviorSubject<boolean>(false),
      metaDataImages$: new BehaviorSubject<any>(null),
      metaDataMyImages$: new BehaviorSubject<any>(null),
   };

   constructor() {
      super();
   }

   getImages$(): Observable<any> {
      return this.store.images$.asObservable();
   }

   getMyImages$(): Observable<any> {
      return this.store.myImages$.asObservable();
   }

   isLoadingGettingImages$() {
      return this.store.loadingGettingImages$.asObservable();
   }

   setLoadingGettingImages(loading: boolean) {
      this.store.loadingGettingImages$.next(loading);
   }

   isLoadingGettingMyImages$() {
      return this.store.loadingGettingMyImages$.asObservable();
   }

   setLoadingGettingMyImages(loading: boolean) {
      this.store.loadingGettingMyImages$.next(loading);
   }

   getMetaDataImages$(): Observable<any> {
      return this.store.metaDataImages$.asObservable();
   }

   getMetaDataMyImages$(): Observable<any> {
      return this.store.metaDataMyImages$.asObservable();
   }

   setMetaDataMyImages(metaDataImages: any) {
      this.store.metaDataMyImages$.next(metaDataImages);
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

   updateImage(_image: Image) {
      const images: Image[] = this.store.images$.value;
      const imageIndex = images.findIndex(image => image.id === _image.id);
      if (imageIndex != -1) {
         images[imageIndex] = { ..._image };
         this.store.images$.next([...images]);
      }
   }

   addMyImage(_image: Image) {
      let images = this.store.myImages$.getValue();
      if (!images.some(image => image.id == _image.id)) {
         images.push(_image);
         this.store.myImages$.next([...images]);
      }
   }

   removeMyImage(_image: Image) {
      const images = this.store.myImages$.getValue();
      const imageIndex = images.findIndex(image => image.id == _image.id);
      if (imageIndex != -1) {
         images.splice(imageIndex, 1);
         this.store.myImages$.next([...images]);
      }
   }

   setMyImages(_images: Image[]) {
      if (Array.isArray(_images)) {
         this.store.myImages$.next([..._images]);
      }
   }
}
