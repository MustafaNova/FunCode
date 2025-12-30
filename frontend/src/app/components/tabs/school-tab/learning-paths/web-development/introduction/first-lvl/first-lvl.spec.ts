import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLvl } from './first-lvl';

describe('FirstLvl', () => {
  let component: FirstLvl;
  let fixture: ComponentFixture<FirstLvl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstLvl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstLvl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
