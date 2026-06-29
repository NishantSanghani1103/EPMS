import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-department-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './department-view.html',
  styleUrl: './department-view.scss',
})
export class DepartmentView {
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

  async deleteDept(id: string) {
    if (confirm('Are You Want To Delete Department ?')) {
      const res = await this.apiService.request(
        'DELETE',
        API_ROUTES.dept.deleteDept(id),
        null,
        null,
        {
          showLoader: true,
          useToken: true,
          showToaster: true,
        },
      );
      if (res.status) {
        this.getDept();
      }
    }
  }
}
