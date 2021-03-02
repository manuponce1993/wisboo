import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import { ImagesQPS, ImagesService } from '../core/services/images.service';
import { ImagesState } from '../core/states/images.state';
import { PaginationLinks } from '../shared/models/paginationLinks';
import { Image } from '../shared/models/image';
import { LOCAL_STORAGE_KEYS } from '../shared/enums/localStorageKeys';

export interface MetaDataImages extends ImagesQPS, PaginationLinks { }
@Injectable({
   providedIn: 'root',
})
export class ImagesFacade {

   constructor(private imagesState: ImagesState, private imagesService: ImagesService) { }

   loadImages(qps?: ImagesQPS, cleanStore = true) {
      this.imagesState.setLoadingGettingImages(true);
      const promise: Promise<any> = new Promise((res, rej) => {
         this.imagesService.getImages(qps).pipe(
            tap(res => {
               const { prev, next, first, last } = res;
               this.imagesState.setMetaDataImages({ ...qps, prev, next, first, last });
            }),
            finalize(() => this.imagesState.setLoadingGettingImages(false))
         ).subscribe(
            (response) => {
               cleanStore ?
                  this.imagesState.setImages(response.results) :
                  this.imagesState.addImages(response.results)
               res(response.results);
            },
            (e) => { rej(e) },
         )
      })
      return from(promise);
   }

   loadMyImages() {
      const myImagesIds: { ids: string[] } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.MY_IMAGES)) || { ids: [] };
      this.imagesState.setLoadingGettingMyImages(true);
      const promise: Promise<any> = new Promise((res, rej) => {
         this.imagesService.getImagesById(myImagesIds?.ids).pipe(
            map(images => images.map(image => {
               image.isSaved = true
               return image;
            })),
            finalize(() => this.imagesState.setLoadingGettingMyImages(false))
         ).subscribe(
            (images) => {
               this.imagesState.setMyImages(images)
               res(images);
            },
            (e) => { rej(e) },
         )
      })
      return from(promise);
   }

   saveImage(image: Image) {
      const myImagesIds: { ids: string[] } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.MY_IMAGES)) || { ids: [] };
      if (!myImagesIds.ids.some(myImageId => myImageId == image.id)) {
         myImagesIds.ids.push(image.id);
         localStorage.setItem(LOCAL_STORAGE_KEYS.MY_IMAGES, JSON.stringify({ ...myImagesIds }))
         this.imagesState.addMyImage(image);
         image.isSaved = true;
         this.imagesState.updateImage(image)
      }
   }

   unsaveImage(image: Image) {
      const myImagesIds: { ids: string[] } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.MY_IMAGES)) || { ids: [] };
      const imageIndex = myImagesIds.ids.findIndex(id => id == image.id);
      if (imageIndex != -1) {
         myImagesIds.ids.splice(imageIndex, 1);
         localStorage.setItem(LOCAL_STORAGE_KEYS.MY_IMAGES, JSON.stringify({ ...myImagesIds }))
         this.imagesState.removeMyImage(image);
         image.isSaved = false;
         this.imagesState.updateImage(image)

      }
   }

   isLoadingGettingImages$(): Observable<boolean> {
      return this.imagesState.isLoadingGettingImages$();
   }

   getImages$(): Observable<any> {
      return this.imagesState.getImages$().pipe(
         map(images => {
            const myImages = this.imagesState.store.myImages$.value;
            return images.map(image => {
               image.isSaved = !!myImages.find(myImage => myImage.id == image.id) ?
                  true : false;
               return image;
            })
         })
      );
   }

   getMyImages$(): Observable<any> {
      return this.imagesState.getMyImages$();
   }

   getMetaDataImages$(): Observable<MetaDataImages> {
      return this.imagesState.getMetaDataImages$();
   }

}