import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { ProjectType } from '../../../../core/models/project.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manager-project-listing',
  imports: [CommonModule,RouterLink],
  templateUrl: './manager-project-listing.html',
  styleUrl: './manager-project-listing.scss',
})
export class ManagerProjectListing {
  apiService = inject(ApiService);
  projectData = signal<ProjectType[]>([]);
  ngOnInit() {
    this.getProject();
  }

  async getProject() {
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
