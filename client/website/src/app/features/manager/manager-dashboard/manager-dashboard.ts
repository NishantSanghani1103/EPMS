import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/service/api.service';
import { ProjectType } from '../../../core/models/project.model';
import { API_ROUTES } from '../../../core/constant/api.routes';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-manager-dashboard',
  imports: [NgClass],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.scss',
})
export class ManagerDashboard {
  apiService = inject(ApiService);
  projectData = signal<ProjectType[]>([]);
  ngOnInit() {
    this.getMyProject();
  }

  async getMyProject() {
    const res = await this.apiService.request<ProjectType[]>(
      'GET',
      API_ROUTES.project.getByManger,
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );

    this.projectData.set(res.data ?? []);
  }
}
