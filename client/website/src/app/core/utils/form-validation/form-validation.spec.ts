import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidation } from './form-validation';

describe('FormValidation', () => {
  let component: FormValidation;
  let fixture: ComponentFixture<FormValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormValidation],
    }).compileComponents();

    fixture = TestBed.createComponent(FormValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
