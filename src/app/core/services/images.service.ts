import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIS } from 'src/app/shared/enums/apis';
import { HttpBaseResponse } from 'src/app/shared/models/httpBaseResponse';
import { environment } from 'src/environments/environment';
import { RestUtilitiesService } from './rest-utilities.service';

export interface ImagesQPS {
   lang?: string,
   query?: string,
   page?: number,
   per_page?: number,
   order_by?: string,
   collections?: number[],
   content_filter?: string,
   color?: string,
   orientation?: string,
}

@Injectable({
   providedIn: 'root',
})
export class ImagesService {

   constructor(private http: HttpClient, private restUtilitiesService: RestUtilitiesService) { }

   getImages(qps?: ImagesQPS): Observable<HttpBaseResponse<any>> {
      const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
      const queryParams: HttpParams = qps ? this.restUtilitiesService.createAndAppendQps(this.restUtilitiesService.formatQPs(qps)) : null;
      return this.http
         .get<any>(`${environment.apiUnsplashService}${APIS.IMAGES}`, {
            headers: queryHeaders,
            observe: 'response',
            params: queryParams
         })
         .pipe<any>(
            map<HttpResponse<any>, any>((response) => {
               return response.body;
            }),
         );
   }

   getImagesByLink(link: string): Observable<HttpBaseResponse<any>> {
      const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
      return this.http
         .get<any>(link, {
            headers: queryHeaders,
            observe: 'response',
         })
         .pipe<any>(
            map<HttpResponse<any>, any>((response) => {
               return response.body;
            }),
         );
   }
}
