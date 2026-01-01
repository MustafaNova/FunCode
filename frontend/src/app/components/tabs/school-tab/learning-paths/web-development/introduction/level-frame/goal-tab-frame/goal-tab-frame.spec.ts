import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTabFrame } from './goal-tab-frame';

describe('GoalTabFrame', () => {
  let component: GoalTabFrame;
  let fixture: ComponentFixture<GoalTabFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalTabFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalTabFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
