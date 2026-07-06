import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('USER') ?? '[]');
  const router = inject(Router);
  console.log(user);
  console.log(route);
  if (user) {
    if (user?.role === 'admin') {
      router.navigate(['/admin/dashboard']);
    }
    if (user?.role === 'manager') {
      router.navigate(['/manager/dashboard']);
    }
    if (user?.role === 'employee') {
      router.navigate(['/employee/dashboard']);
    }
  }

  return true;
};
