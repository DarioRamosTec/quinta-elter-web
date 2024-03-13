import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isVerificationData()) {
    if (authService.getRole() == '2' || authService.getRole() == '3') {
      return true;
    }
    return router.parseUrl(route.url.shift()?.toString() ?? '');
  }

  return router.parseUrl('login');
};
