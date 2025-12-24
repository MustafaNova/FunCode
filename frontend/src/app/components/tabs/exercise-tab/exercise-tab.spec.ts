import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTab } from './exercise-tab';

describe('ExerciseTab', () => {
  let component: ExerciseTab;
  let fixture: ComponentFixture<ExerciseTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
