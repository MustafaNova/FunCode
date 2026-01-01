import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTabFrame } from './task-tab-frame';

describe('TaskTabFrame', () => {
  let component: TaskTabFrame;
  let fixture: ComponentFixture<TaskTabFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTabFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTabFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
