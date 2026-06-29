import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';

@Component({
  selector: 'app-user-add',
  imports: [],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd {
  apiService = inject(ApiService);
  deptData = signal<Dept[]>([]);
  ngOnInit() {
    this.getDept();
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
