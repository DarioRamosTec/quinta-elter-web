import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isVerified() && authService.isActived()) {
    if (authService.getRole() == 2 || authService.getRole() == 3) {
      return true;
    }
    return router.parseUrl('');
  }

  return router.parseUrl('login');
};
