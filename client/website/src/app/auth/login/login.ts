import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/service/api.service';
import { FormValidation } from '../../core/utils/form-validation/form-validation';
import { API_ROUTES } from '../../core/constant/api.routes';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormValidation],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  showPassword = signal<boolean>(false);
  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  userlogin() {
    if (this.loginForm.valid) {
      this.authService.userLogin(this.loginForm.value);
    }
  }
}
