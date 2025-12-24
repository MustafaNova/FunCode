import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilTab } from './profil-tab';

describe('ProfilTab', () => {
  let component: ProfilTab;
  let fixture: ComponentFixture<ProfilTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
