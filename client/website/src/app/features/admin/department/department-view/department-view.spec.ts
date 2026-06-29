import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentView } from './department-view';

describe('DepartmentView', () => {
  let component: DepartmentView;
  let fixture: ComponentFixture<DepartmentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentView],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
