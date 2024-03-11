import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Solicitud saliente:', req);
    return next.handle(req);
  }
}

export const LoggingInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoggingInterceptor,
  multi: true
};
