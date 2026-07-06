import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { ApiService } from '../../../core/service/api.service';
import { API_ROUTES } from '../../../core/constant/api.routes';

@Component({
  selector: 'app-emp-profile',
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './emp-profile.html',
  styleUrl: './emp-profile.scss',
})
export class EmpProfile {
  employee = inject<any>(ROUTER_OUTLET_DATA);
  apiService = inject(ApiService);
  fb = inject(FormBuilder);
  userFrom!: FormGroup;
  selectedFile!: File;

  ngOnInit() {}
  constructor() {
    effect(() => {
      console.log(this.employee());
      this.initializeUserEditForm();
    });
  }
  initializeUserEditForm() {
    this.userFrom = this.fb.group({
      firstName: [
        this.employee()?.firstName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],

      lastName: [
        this.employee()?.lastName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],

      email: [this.employee()?.email, [Validators.required, Validators.email]],

      phone: [this.employee()?.phone, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],

      department: [
        {
          value: this.employee()?.deparmentId.name,
          disabled: true,
        },
        Validators.required,
      ],

      role: [
        {
          value: this.employee()?.user?.role,
          disabled: true,
        },
        Validators.required,
      ],
      profileImage: '',
    });
  }

  async updateUser() {

      const formData = new FormData();
      formData.append('firstName', this.userFrom.get('firstName')?.value);
      formData.append('lastName', this.userFrom.get('lastName')?.value);
      formData.append('email', this.userFrom.get('email')?.value);
      formData.append('phone', this.userFrom.get('phone')?.value);

      if (this.selectedFile) {
        formData.append('profileImage', this.selectedFile);
      }
      console.log(formData);
      
      const res = await this.apiService.request(
        'PUT',
        API_ROUTES.user.userEditByToken,
        formData,
        null,
        {
          showLoader: true,
          useToken: true,
          showToaster: true,
        },
      );
      console.log(res);
    
    // console.log(this.userFrom.value);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files && event.target.files[0];
    if (!file) return;
    console.log(file.name);

    this.selectedFile = file;
    this.userFrom.patchValue({
      profileImage: file.name,
    });
  }
}
