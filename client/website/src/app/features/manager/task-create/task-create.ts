import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/service/api.service';
import { API_ROUTES } from '../../../core/constant/api.routes';
import { ProjectType } from '../../../core/models/project.model';
import { userDataResponse } from '../../../core/models/user.model';

@Component({
  selector: 'app-task-create',
  imports: [],
  templateUrl: './task-create.html',
  styleUrl: './task-create.scss',
})
export class TaskCreate {
  apiService = inject(ApiService);
  projectData = signal<ProjectType[]>([]);
  empData = signal<userDataResponse[]>([]);
  ngOnInit() {
    this.getProject();
    this.getEmp();
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
    console.log(res.data);

    this.projectData.set(res.data ?? []);
  }

  async getEmp() {
    const res = await this.apiService.request<userDataResponse[]>(
      'GET',
      API_ROUTES.user.userView,
      null,
      {
        type: 'employee',
      },
      {
        showLoader: true,
        useToken: true,
      },
    );
    console.log(res);

    this.empData.set(res.data ?? []);
  }
}
