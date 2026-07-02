import { Component, inject, Input, signal } from '@angular/core';
import { ApiService } from '../../../core/service/api.service';
import { API_ROUTES } from '../../../core/constant/api.routes';
import { ProjectType } from '../../../core/models/project.model';
import { userDataResponse } from '../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { projectMemberResponse } from '../../../core/models/projectMember.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  imports: [],
  templateUrl: './task-create.html',
  styleUrl: './task-create.scss',
})
export class TaskCreate {
  apiService = inject(ApiService);
  activatedRoutes = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  projectData = signal<ProjectType[]>([]);
  empData = signal<projectMemberResponse[]>([]);
  taskForm!: FormGroup;
  @Input() projectId!: string | undefined;
  ngOnInit() {
    const id = this.activatedRoutes.snapshot.paramMap.get('projectId');
    console.log(id);
    console.log(this.projectId);
    this.getEmp(this.projectId);
    this.initializeForm();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      startDate: [''],
      dueDate: [''],
      assignedTo: ['', Validators.required],
      priority: ['medium'],
      status: ['todo'],
      estimatedHours: [0],
      notes: [''],
    });
  }

  async getEmp(id: string | undefined) {
    const res = await this.apiService.request<projectMemberResponse[]>(
      'GET',
      API_ROUTES.projectMember.getByProject(id),
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );
    console.log(res.data);

    this.empData.set(res.data ?? []);
  }
}
