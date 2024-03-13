import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuestGuard: CanActivateFn = (route, state) => {
    
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isVerificationData()) {
    return true;
  }
  
  return router.parseUrl('auth');
};
