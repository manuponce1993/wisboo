import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ImagesQPS, ImagesService } from '../core/services/images.service';
import { ImagesState } from '../core/states/images.state';
import { PaginationLinks } from '../shared/models/paginationLinks';

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

   isLoadingGettingImages$(): Observable<boolean> {
      return this.imagesState.isLoadingGettingImages$();
   }

   getImages$(): Observable<any> {
      return this.imagesState.getImages$();
   }

   getMetaDataImages$(): Observable<MetaDataImages> {
      return this.imagesState.getMetaDataImages$();
   }

}