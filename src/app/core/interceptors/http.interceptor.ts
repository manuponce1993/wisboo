import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor as _HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from '../services/alert.service';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';

@Injectable()
export class HttpInterceptor implements _HttpInterceptor {
   constructor(
      private authService: AuthService,
      private alertService: AlertService,
      private handlerErrorService: HttpErrorHandlerService,
   ) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Add authorization header with accessKey if available
      const accessKey: string = this.authService.ACCESS_KEY;
      if (!!accessKey) {
         request = request.clone({
            setHeaders: {
               Authorization: `Client-ID ${accessKey}`,
            },
         });
      }
      return next.handle(request).pipe(
         map((response) => {
            if (response instanceof HttpResponse) {
               const headerLink: string = response.headers.get('link');
               if (!!headerLink) {
                  // Set links as query params objects on body
                  const linksByComma: string[] = headerLink.split(',');
                  const links: { [x: string]: {} }[] = linksByComma.map(link => {
                     let [url, rel] = link.split(';');
                     rel = eval(rel);
                     url = url.replace('<', '').replace('>', '');
                     const urlParams: any = new URLSearchParams(url.split('?')[1]);
                     const objParams = {};
                     for (var pair of urlParams.entries()) {
                        objParams[pair[0]] = pair[1];
                     }
                     return { [rel]: objParams }
                  })
                  if (!!links && links.length > 0) {
                     links.forEach(finalLink => {
                        response.body[Object.keys(finalLink)[0]] = Object.values(finalLink)[0]
                     });
                  }
               }
            }
            return response;
         }),
         // HTTP Errors:
         catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
               try {
                  const messageError = this.handlerErrorService.handleError(err);
                  if (messageError) {
                     this.alertService.openError(messageError);
                  }
               } catch (e) {
                  this.alertService.openError('Ha ocurrido un error');
               }
            }
            return throwError(err);
         }),
      );
   }
}
