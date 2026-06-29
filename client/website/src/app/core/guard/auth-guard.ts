import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(route.data['role']);
  const routes = inject(Router);
  const user = JSON.parse(localStorage.getItem('USER') ?? '');

  if (route.data['role'].includes(user.role)) {
    return true;
  }

  return routes.navigate(['/']);
};
