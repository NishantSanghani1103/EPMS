import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { API_ROUTES } from '../constant/api.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiSerivce = inject(ApiService);
  router = inject(Router);
  user = signal<loginType | null>(JSON.parse(localStorage.getItem('USER') ?? 'null'));
  async userLogin(data: any) {
    const res = await this.apiSerivce.request<loginType>(
      'POST',
      API_ROUTES.login.base,
      data,
      null,
      {
        showLoader: true,
        showToaster: true,
      },
    );
    console.log(res);
    this.user.set(res.data || null);
    localStorage.setItem('TOKEN', res['token']);
    localStorage.setItem('USER', JSON.stringify(res.data));
    if (res.data?.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }
    if (res.data?.role === 'manager') {
      this.router.navigate(['/manager/dashboard']);
    }
    if (res.data?.role === 'employee') {
      this.router.navigate(['/employee/dashboard']);
    }
  }
  userLogOut() {
    if (confirm('Are You Want To LogOut ? ')) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}
