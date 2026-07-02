import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../../../core/service/api.service';
import { API_ROUTES } from '../../../../../core/constant/api.routes';
import { projectMemberResponse } from '../../../../../core/models/projectMember.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-members-view',
  imports: [RouterLink,CommonModule],
  templateUrl: './members-view.html',
  styleUrl: './members-view.scss',
})
export class MembersView {
  @Input() projectId!: string | undefined;
  activatedRoutes = inject(ActivatedRoute);
  apiService = inject(ApiService);
  projectMemberData = signal<projectMemberResponse[]>([]);
  ngOnInit() {
    const projectId = this.activatedRoutes.snapshot.paramMap.get('projectId');
    console.log(projectId);
    this.getProjectMember(projectId);
  }

  async getProjectMember(projectId: string | null) {
    const res = await this.apiService.request<projectMemberResponse[]>(
      'GET',
      API_ROUTES.projectMember.getByProject(projectId),
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );
    console.log(res);
    this.projectMemberData.set(res.data ?? [])
  }
}
