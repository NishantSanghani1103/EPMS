import { Component, effect, inject, signal } from '@angular/core';
import { MembersView } from '../projectWorkSpace/members-view/members-view';
import { RouterOutlet, RouterLinkWithHref, RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { ProjectType } from '../../../../core/models/project.model';
import { CommonModule, NgClass } from '@angular/common';
import { MembersAdd } from '../projectWorkSpace/members-add/members-add';
import { TaskCreate } from '../../task-create/task-create';
import { TaskView } from '../projectWorkSpace/task/task-view/task-view';

@Component({
  selector: 'app-project-workspace',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MembersAdd,
    NgClass,
    MembersView,
    TaskCreate,
    TaskView,
  ],
  templateUrl: './project-workspace.html',
  styleUrl: './project-workspace.scss',
})
export class ProjectWorkspace {
  activatedRoutes = inject(ActivatedRoute);
  apiService = inject(ApiService);
  projectId = signal<string>('');
  projectData = signal<ProjectType | null>(null);
  projectDiv = signal<number>(1);
  ngOnInit() {
    const id = this.activatedRoutes.snapshot.paramMap.get('projectId');
    this.projectId.set(id ?? '');
    this.getProjectById();
  }
  constructor() {
    effect(() => {
      console.log(this.projectDiv());
    });
  }
  async getProjectById() {
    const res = await this.apiService.request<ProjectType>(
      'GET',
      API_ROUTES.project.getById(this.projectId()),
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );
    // console.log(res);

    this.projectData.set(res.data ?? null);
  }
}
