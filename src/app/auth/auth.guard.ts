import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isVerified()) {
    return router.parseUrl('');
  } else if (authService.isActived()) {
    return router.parseUrl('verificate');
  } else if (authService.isAuthenticated()) {
    return router.parseUrl('activate');
  }

  return true;
};
