import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormValidation } from '../../../../core/utils/form-validation/form-validation';

@Component({
  selector: 'app-department-add',
  imports: [ReactiveFormsModule, FormValidation, RouterLink],
  templateUrl: './department-add.html',
  styleUrl: './department-add.scss',
})
export class DepartmentAdd {
  deptFrom!: FormGroup;
  fb = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);
  activatedRoutes = inject(ActivatedRoute);

  deptId = signal<string | null>(null);
  ngOnInit() {
    this.initializeDeptForm();

    const id = this.activatedRoutes.snapshot.paramMap.get('id');
    if (id) {
      this.deptId.set(id);
      this.deptViewById();
    }
  }
  get f() {
    return this.deptFrom.controls;
  }

  initializeDeptForm() {
    this.deptFrom = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
    });
  }

  async deptAdd() {
    if (this.deptFrom.valid) {
      let res;
      if (this.deptId()) {
        res = await this.apiService.request(
          'PUT',
          API_ROUTES.dept.editDept(this.deptId()),
          this.deptFrom.value,
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
          API_ROUTES.dept.deptAdd,
          this.deptFrom.value,
          null,
          {
            showLoader: true,
            showToaster: true,
            useToken: true,
          },
        );
      }

      if (res?.status) {
        setTimeout(() => {
          this.router.navigate(['/admin/department/view']);
        }, 2000);
      }
    }
  }

  async deptViewById() {
    const res = await this.apiService.request<Dept>(
      'GET',
      API_ROUTES.dept.getById(this.deptId()),
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );

    this.deptFrom.patchValue({
      name: res.data?.name,
      description: res.data?.description,
    });
  }
}
