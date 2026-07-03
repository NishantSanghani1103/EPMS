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

@Component({
  selector: 'app-emp-profile',
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './emp-profile.html',
  styleUrl: './emp-profile.scss',
})
export class EmpProfile {
  employee = inject<any>(ROUTER_OUTLET_DATA);

  fb = inject(FormBuilder);
  userFrom!: FormGroup;

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
    console.log(this.userFrom.value);
  }

  onFileSelected(event: any) {
    const fileName = event.target.files[0].name;
    console.log(fileName);

    if (fileName) {
      this.userFrom.patchValue({
        profileImage: fileName,
      });
    }
  }
}
