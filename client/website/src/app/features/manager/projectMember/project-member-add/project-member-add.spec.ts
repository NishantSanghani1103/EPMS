import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberAdd } from './project-member-add';

describe('ProjectMemberAdd', () => {
  let component: ProjectMemberAdd;
  let fixture: ComponentFixture<ProjectMemberAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMemberAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
