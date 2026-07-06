import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { ProjectType } from '../../../../core/models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-view',
  imports: [RouterLink, CommonModule],
  templateUrl: './project-view.html',
  styleUrl: './project-view.scss',
})
export class ProjectView {
  projectData = signal<ProjectType[]>([]);
  deptData = signal<Dept[]>([]);
  apiService = inject(ApiService);
  ngOnInit() {
    this.getProject();
    this.departmentView();
  }

  async departmentView() {
    const res = await this.apiService.request<Dept[]>('GET', API_ROUTES.dept.deptView, null, null, {
      showLoader: true,
      useToken: true,
    });
    this.deptData.set(res.data ?? []);
  }
  deptHandle(event: any) {
    const departmentId = event.target.value;
    this.getProject(departmentId || undefined);
  }
  async getProject(departmentId?: string) {
    const res = await this.apiService.request<ProjectType[]>(
      'GET',
      API_ROUTES.project.projectView,
      null,

      departmentId ? { departmentId } : null,

      {
        showLoader: true,
      },
    );

    console.log(res.data);

    this.projectData.set(res.data ?? []);
  }
  async deleteProject(id: string) {
    if (confirm('Are You Want To Delete Project ? ')) {
      const res = await this.apiService.request(
        'DELETE',
        API_ROUTES.project.projectDelete(id),
        null,
        null,
        {
          showLoader: true,
          useToken: true,
          showToaster: true,
        },
      );

      if (res.status) {
        this.getProject();
      }
    }
  }
}
