import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add new headers.
    const modifiedReq = req.clone({
      url: req.url,
      headers: req.headers.set('x-api-key', environment.apiKey)
      // You can add other headers here as needed
    });

    console.log('Modified Request Headers:', modifiedReq.headers);


    // Send the modified request
    return next.handle(modifiedReq).pipe(
      // Handle errors
      catchError((error: HttpErrorResponse) => {
        // Log or handle the error here
        console.error('Error occurred:', error);

        // You can also redirect to an error page, show a notification, etc.
        return throwError(() => error);
      })
    );
  }
}

