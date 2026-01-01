import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTabFrame } from './quiz-tab-frame';

describe('QuizTabFrame', () => {
  let component: QuizTabFrame;
  let fixture: ComponentFixture<QuizTabFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizTabFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizTabFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
