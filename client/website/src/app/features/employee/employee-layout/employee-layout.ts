import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { ApiService } from '../../../core/service/api.service';
import { API_ROUTES } from '../../../core/constant/api.routes';

@Component({
  selector: 'app-employee-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './employee-layout.html',
  styleUrl: './employee-layout.scss',
})
export class EmployeeLayout {
  authService = inject(AuthService);
  apiService = inject(ApiService);
  userData = signal<any>(null);
  router=inject(Router)
  ngOnInit() {
    const userDetails = JSON.parse(localStorage.getItem('USER') ?? '[]');
    console.log(userDetails);

    this.getEmp();
  }

  async getEmp() {
    const res = await this.apiService.request('GET', API_ROUTES.user.getByToken, null, null, {
      showLoader: true,
      useToken: true,
    });

    console.log(res);
    this.userData.set(res.data);
  }
}
