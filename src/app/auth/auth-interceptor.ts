import { Injectable, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken : String = this.auth.getToken();
    const authType : String = this.auth.getTokenType();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', authType + ' ' + authToken)
      .set('Accept', 'application/json')
    });

    return next.handle(authReq);
  }
}

export const authInterceptorProvider: Provider = { 
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true 
}