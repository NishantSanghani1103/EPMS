import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';
import { API_ROUTES } from '../../../../core/constant/api.routes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidation } from '../../../../core/utils/form-validation/form-validation';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { userDataResponse } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-add',
  imports: [ReactiveFormsModule, FormValidation, RouterLink],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd {
  apiService = inject(ApiService);
  router = inject(Router);
  fb = inject(FormBuilder);
  activatedRoutes = inject(ActivatedRoute);
  deptData = signal<Dept[]>([]);
  deptId = signal<string | null>(null);
  userForm!: FormGroup;
  ngOnInit() {
    this.getDept();
    this.initializeUserForm();
    const id = this.activatedRoutes.snapshot.paramMap.get('id');
    if (id) {
      this.deptId.set(id);
      this.getUserById();
    }
  }

  initializeUserForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(8)]],

      confirmPassword: ['', [Validators.required]],

      phone: [null],

      role: ['employee', [Validators.required]],

      departmentId: ['', [Validators.required]],
    });
  }
  get f() {
    return this.userForm.controls;
  }

  async userAdd() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      let res;
      if (this.deptId()) {
        res = await this.apiService.request(
          'PUT',
          API_ROUTES.user.userEdit(this.deptId()),
          this.userForm.value,
          null,
          {
            showLoader: true,
            useToken:true,
            showToaster:true
          },
        );
      } else {
        res = await this.apiService.request(
          'POST',
          API_ROUTES.user.userAdd,
          this.userForm.value,
          null,
          {
            showLoader: true,
            useToken: true,
            showToaster: true,
          },
        );
      }
      if (res?.status) {
        this.router.navigate(['/admin/user/view']);
      }
    }
  }

  async getDept() {
    const res = await this.apiService.request<Dept[]>('GET', API_ROUTES.dept.deptView, null, null, {
      showLoader: true,
      useToken: true,
    });
    console.log(res);
    this.deptData.set(res.data ?? []);
  }

  async getUserById() {
    const res = await this.apiService.request<userDataResponse>(
      'GET',
      API_ROUTES.user.getById(this.deptId()),
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );
    console.log(res);
    if (res.status) {
      this.userForm.patchValue({
        firstName: res.data?.firstName,
        lastName: res.data?.lastName,
        email: res.data?.email,
        phone: res.data?.phone,
        role: res.data?.role,
        departmentId: res.data?.departmentId,
        password: res.data?.password,
        confirmPassword: res.data?.password,
      });
    }
  }
}
