import { Component, inject, Input, signal } from '@angular/core';
import { ApiService } from '../../../../../core/service/api.service';
import { API_ROUTES } from '../../../../../core/constant/api.routes';
import { userDataResponse } from '../../../../../core/models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidation } from '../../../../../core/utils/form-validation/form-validation';

@Component({
  selector: 'app-members-add',
  imports: [ReactiveFormsModule, FormValidation],
  templateUrl: './members-add.html',
  styleUrl: './members-add.scss',
})
export class MembersAdd {
  @Input() projectId!: string | undefined;
  apiService = inject(ApiService);
  empData = signal<userDataResponse[]>([]);
  empSingleData = signal<userDataResponse | null>(null);
  fb = inject(FormBuilder);
  memberAddForm!: FormGroup;
  ngOnInit() {
    console.log(this.projectId);
    this.getEmp();
    this.initializeForm();
  }

  initializeForm() {
    this.memberAddForm = this.fb.group({
      userId: ['', Validators.required],
      joinedAt: ['', Validators.required],
      notes: [''],
      projectId: [this.projectId],
    });
  }

  get f() {
    return this.memberAddForm.controls;
  }
  async projectMemberSave() {
    console.log(this.memberAddForm.value);
    if (this.memberAddForm.valid) {
      const res = await this.apiService.request(
        'POST',
        API_ROUTES.projectMember.memberAdd,
        this.memberAddForm.value,
        null,
        {
          showLoader: true,
          useToken: true,
          showToaster: true,
        },
      );
    }
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

    this.empData.set(res.data ?? []);
    console.log(res);
  }

  async getEmpById(event: any) {
    const empId = event.target.value;
    if (!empId) {
      return;
    }
    const res = await this.apiService.request<userDataResponse>(
      'GET',
      API_ROUTES.user.getById(empId),
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );

    this.empSingleData.set(res.data ?? null);
  }
}
