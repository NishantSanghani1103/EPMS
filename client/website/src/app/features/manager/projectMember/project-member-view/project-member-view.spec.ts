import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberView } from './project-member-view';

describe('ProjectMemberView', () => {
  let component: ProjectMemberView;
  let fixture: ComponentFixture<ProjectMemberView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberView],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMemberView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
