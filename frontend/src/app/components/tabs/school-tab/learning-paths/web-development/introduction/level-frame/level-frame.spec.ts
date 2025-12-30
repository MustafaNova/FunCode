import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelFrame } from './level-frame';

describe('LevelFrame', () => {
  let component: LevelFrame;
  let fixture: ComponentFixture<LevelFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
