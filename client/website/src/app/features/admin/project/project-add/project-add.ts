import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { userDataResponse } from '../../../../core/models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidation } from '../../../../core/utils/form-validation/form-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectType } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-add',
  imports: [ReactiveFormsModule, FormValidation],
  templateUrl: './project-add.html',
  styleUrl: './project-add.scss',
})
export class ProjectAdd {
  apiService = inject(ApiService);
  router = inject(Router);
  userData = signal<userDataResponse[]>([]);
  deptData = signal<Dept[]>([]);
  projectAddForm!: FormGroup;
  pId = signal<string | null>(null);
  fb = inject(FormBuilder);
  activatedRoutes = inject(ActivatedRoute);
  ngOnInit() {
    this.getManager();
    this.getDept();
    this.initializeProjectForm();

    const id = this.activatedRoutes.snapshot.paramMap.get('id');
    console.log(id);
    this.pId.set(id);
    if (id) {
      this.getSingleProject(id);
    }
  }

  initializeProjectForm() {
    this.projectAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      description: ['', [Validators.maxLength(1000)]],

      departmentId: ['', [Validators.required]],

      managerId: ['', [Validators.required]],

      startDate: ['', [Validators.required]],

      endDate: [''],

      status: ['planned'],
    });
  }

  get f() {
    return this.projectAddForm.controls;
  }
  async projectAdd() {
    let res;
    if (this.projectAddForm.valid) {
      if (this.pId()) {
        res = await this.apiService.request(
          'PUT',
          API_ROUTES.project.projectEdit(this.pId()),
          this.projectAddForm.value,
          null,
          {
            showLoader: true,
            showToaster: true,
            useToken: true,
          },
        );
      } else {
        res = await this.apiService.request(
          'POST',
          API_ROUTES.project.projectAdd,
          this.projectAddForm.value,
          null,
          {
            showLoader: true,
            showToaster: true,
            useToken: true,
          },
        );
      }

      if (res.status) {
        this.router.navigate(['/admin/project/view']);
      }
    }
  }
  async getManager() {
    const res = await this.apiService.request<userDataResponse[]>(
      'GET',
      API_ROUTES.user.userView,
      null,
      {
        type: 'manager',
      },
      {
        showLoader: true,
        useToken: true,
      },
    );
    this.userData.set(res.data ?? []);
    console.log(res.data);
  }

  async getDept() {
    const res = await this.apiService.request<Dept[]>('GET', API_ROUTES.dept.deptView, null, null, {
      showLoader: true,
      useToken: true,
    });

    console.log(res);
    this.deptData.set(res.data ?? []);
  }

  async getSingleProject(pId: string) {
    const res = await this.apiService.request<ProjectType>(
      'GET',
      API_ROUTES.project.getById(pId),
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );

    if (res.status) {
      this.projectAddForm.patchValue({
        name: res.data?.name,
        departmentId: res.data?.departmentId,
        description: res.data?.description,
        managerId: res.data?.managerId,
        status: res.data?.status,
        startDate: res.data?.startDate,
        endDate: res.data?.endDate,
      });
    }
  }
}
