import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

export const authLoginGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)

  return new Observable<boolean>(observe => {  
    authService.check().subscribe(data => {
      switch (data) {
        case AuthService.STATE_AUTH:
          router.navigate(['/'])
          break;
        case AuthService.STATE_NOT_AUTH:
          //router.navigate(['/login'])
          observe.next(true)
          break;
        case AuthService.STATE_NOT_VERIFY:
          router.navigate(['/CodigoVerificacion'])
          break;
      }
    })
  })
};
