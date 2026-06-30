import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { userDataResponse } from '../../../../core/models/user.model';

@Component({
  selector: 'app-project-add',
  imports: [],
  templateUrl: './project-add.html',
  styleUrl: './project-add.scss',
})
export class ProjectAdd {
  apiService = inject(ApiService);
  userData = signal<userDataResponse[]>([]);
  deptData = signal<Dept[]>([]);
  ngOnInit() {
    this.getManager();
    this.getDept();
  }

  async getManager() {
    const res = await this.apiService.request<userDataResponse[]>(
      'GET',
      API_ROUTES.user.userView,
      null,
      {
        type: 'manager',
      },
      {
        showLoader: true,
        useToken: true,
      },
    );
    this.userData.set(res.data ?? []);
    console.log(res.data);
  }

  async getDept() {
    const res = await this.apiService.request<Dept[]>('GET', API_ROUTES.dept.deptView, null, null, {
      showLoader: true,
      useToken: true,
    });

    console.log(res);
    this.deptData.set(res.data ?? []);
  }
}
