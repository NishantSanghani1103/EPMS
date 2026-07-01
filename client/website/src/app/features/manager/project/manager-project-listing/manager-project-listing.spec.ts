import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProjectListing } from './manager-project-listing';

describe('ManagerProjectListing', () => {
  let component: ManagerProjectListing;
  let fixture: ComponentFixture<ManagerProjectListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerProjectListing],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerProjectListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
