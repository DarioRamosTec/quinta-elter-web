import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlSegment } from '@angular/router';

export const authActivateGuard: CanActivateFn = (route, state) => {
  let router : Router = inject(Router)

  return true;
};
