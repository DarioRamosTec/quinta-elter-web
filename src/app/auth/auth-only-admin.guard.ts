import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service'

export const authOnlyAdminGuard: CanActivateFn = (route, state) => {
    
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isVerificationData()) {
    if (authService.getRole() == '3') {
      return true;
    }
    return router.parseUrl('');
  }
  return router.parseUrl('login');
};
