import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptTabFrame } from './concept-tab-frame';

describe('ConceptTabFrame', () => {
  let component: ConceptTabFrame;
  let fixture: ComponentFixture<ConceptTabFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptTabFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptTabFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
