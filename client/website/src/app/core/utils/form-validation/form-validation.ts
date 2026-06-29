import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-form-validation',
  imports: [],
  templateUrl: './form-validation.html',
  styleUrl: './form-validation.scss',
})
export class FormValidation {
  @Input() control!: AbstractControl | null;
  @Input() label = 'Field';
}
