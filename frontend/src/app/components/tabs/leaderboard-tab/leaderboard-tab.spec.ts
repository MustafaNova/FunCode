import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardTab } from './leaderboard-tab';

describe('LeaderboardTab', () => {
  let component: LeaderboardTab;
  let fixture: ComponentFixture<LeaderboardTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
