import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { ImagesQPS, ImagesService } from '../core/services/images.service';
import { ImagesState } from '../core/states/images.state';
import { LOCAL_STORAGE_KEYS } from '../shared/enums/localStorageKeys';
import { Image } from '../shared/models/image';
import { PaginationLinks } from '../shared/models/paginationLinks';

export interface MetaDataImages extends ImagesQPS, PaginationLinks { }
@Injectable({
   providedIn: 'root',
})
export class ImagesFacade {

   constructor(private imagesState: ImagesState, private imagesService: ImagesService) { }

   // ** Images List ** 

   /**
    * * Returns an observable that will emit an array of Images after obtaining the content through a GET to the api
    * * Update Images store
    * @param qps: [ImageQPS - Optional] query parameters from the request
    * @param cleanStore: [Boolean - Default: true] Indicates if the image store will be set (true) or if it will be added to the existing records (false) with the result of the request
    */
   loadImages(qps?: ImagesQPS, cleanStore = true): Observable<Image[]> {
      this.imagesState.setLoadingGettingImages(true);
      const promise: Promise<Image[]> = new Promise((res, rej) => {
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

   /**
    * * Returns an Observable that emits values [Image[]] each time Images store is updated
    */
   getImages$(): Observable<Image[]> {
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

   /**
    * * Returns an Observable that emits values [boolean] each time the request GET images starts (emits true value) or ends (emits false value)
    */
   isLoadingGettingImages$(): Observable<boolean> {
      return this.imagesState.isLoadingGettingImages$();
   }

   /**
    * * Returns an Observable that emits values (MetaDataImages) each time the MetaData of Images Store is updated 
    */
   getMetaDataImages$(): Observable<MetaDataImages> {
      return this.imagesState.getMetaDataImages$();
   }

   // ** My Images List ** 

   /**
    * * Returns an observable that will emit an array of Images after obtaining the content through a GET to the api.
    * * Update MyImages store 
    * @param qps: [ImageQPS - Optional] query parameters from the request
    * @param cleanStore: [Boolean - Default: true] Indicates if the image store will be set (true) or if it will be added to the existing records (false) with the result of the request
    */
   loadMyImages(): Observable<Image[]> {
      const myImagesIds: { ids: string[] } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.MY_IMAGES)) || { ids: [] };
      this.imagesState.setLoadingGettingMyImages(true);
      const promise: Promise<Image[]> = new Promise((res, rej) => {
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

   /**
    * * Returns an Observable that emits values [Image[]] each time MyImages store is updated
    */
   getMyImages$(): Observable<Image[]> {
      return this.imagesState.getMyImages$();
   }

   /**
    * * Save image to MyImages store & to the LocalStorage
    * @param image: [Image] image to save
    */
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

   /**
    * * Unsave image from MyImages store (if exists) & from the LocalStorage
    * @param image: [Image] image to unsave
    */
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

}