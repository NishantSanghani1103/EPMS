import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTaskView } from './emp-task-view';

describe('EmpTaskView', () => {
  let component: EmpTaskView;
  let fixture: ComponentFixture<EmpTaskView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpTaskView],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpTaskView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
