import { Routes } from '@angular/router';
import { SchoolTab } from './components/tabs/school-tab/school-tab';
import { LeaderboardTab } from './components/tabs/leaderboard-tab/leaderboard-tab';
import { ExerciseTab } from './components/tabs/exercise-tab/exercise-tab';
import { ProfilTab } from './components/tabs/profil-tab/profil-tab';

export const routes: Routes = [
  { path: "", component: SchoolTab},
  { path: "exercise", component: ExerciseTab},
  { path: "leaderboard", component: LeaderboardTab},
  { path: "profil", component: ProfilTab},
  ];
