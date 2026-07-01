import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { ProjectType } from '../../../../core/models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-view',
  imports: [RouterLink,CommonModule],
  templateUrl: './project-view.html',
  styleUrl: './project-view.scss',
})
export class ProjectView {
  projectData = signal<ProjectType[]>([]);
  apiService = inject(ApiService);
  ngOnInit() {
    this.getProject();
  }
  async getProject() {
    const res = await this.apiService.request<ProjectType[]>(
      'GET',
      API_ROUTES.project.projectView,
      null,
      null,
      {
        showLoader: true,
      },
    );

    console.log(res.data);

    this.projectData.set(res.data ?? []);
  }
}
