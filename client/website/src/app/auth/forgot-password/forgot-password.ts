import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { passwordMatchValidator } from '../../core/validators/passwordMatchValidator';
import { FormValidation } from '../../core/utils/form-validation/form-validation';
import { ApiService } from '../../core/service/api.service';
import { API_ROUTES } from '../../core/constant/api.routes';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, FormValidation],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  fb = inject(FormBuilder);
  forgotForm!: FormGroup;
  apiService = inject(ApiService);

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.forgotForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validate: passwordMatchValidator,
      },
    );
  }

  get f() {
    return this.forgotForm.controls;
  }
  async forgotPassword() {
    alert();
    console.log(this.forgotForm.value);
    if (this.forgotForm.valid) {
      const res = await this.apiService.request(
        'PUT',
        API_ROUTES.login.forgotPassword,
        this.forgotForm.value,
        null,
        {
          showLoader: true,
          showToaster: true,
        },
      );
    }
  }
}
