import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class HttpErrorHandlerService {

   constructor() { }

   handleError(httpErrorResponse: HttpErrorResponse) {
      let message: string;
      console.error(httpErrorResponse);
      switch (httpErrorResponse.status) {
         case 400: // Bad Request (Business Error)
            message = httpErrorResponse?.error?.errors[0];
            // Show the message in the component from where the call came
            break;
         case 401: // Unauthorized
            message = 'Token inválido';
            break;
         case 403: // Forbidden
            message = 'Acceso al recurso prohibido';
            break;
         case 404: // Not Found
            message = 'Recurso no encontrado';
            break;
         case 422: // Unprocessable Entity
            message = `Unprocessable Entity: ${httpErrorResponse?.error?.errors[0]}`;
            break;
         case 500: // Internal Server Error
         case 503: // Internal Server Error
            message = 'Error en el servidor, reinténtelo más tarde';
            break;
         default: // Any other possible error status
            message = 'Ha ocurrido un error'
            break;
      }
      return message;
   }
}
