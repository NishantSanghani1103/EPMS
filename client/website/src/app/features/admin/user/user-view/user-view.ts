import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { userDataResponse } from '../../../../core/models/user.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink, NgClass],
  templateUrl: './user-view.html',
  styleUrl: './user-view.scss',
})
export class UserView {
  apiService = inject(ApiService);
  userData = signal<userDataResponse[]>([]);
  ngOnInit() {
    this.getUser();
  }
  async getUser() {
    const res = await this.apiService.request<userDataResponse[]>(
      'GET',
      API_ROUTES.user.userView,
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );
    console.log(res.data);
    this.userData.set(res.data ?? []);
  }

  async deleteUser(id: string) {
    if (confirm('Are You Want To Delete User ? ')) {
      const res = await this.apiService.request(
        'DELETE',
        API_ROUTES.user.userDelete(id),
        null,
        null,
        {
          showLoader: true,
          showToaster: true,
          useToken: true,
        },
      );
      if (res.status) {
        this.getUser();
      }
    }
  }
}
