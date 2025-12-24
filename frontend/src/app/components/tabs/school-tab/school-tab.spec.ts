import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTab } from './school-tab';

describe('SchoolTab', () => {
  let component: SchoolTab;
  let fixture: ComponentFixture<SchoolTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
