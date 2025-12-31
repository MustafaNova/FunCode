import { Component } from '@angular/core';
import { FirstLvl } from './learning-paths/web-development/introduction/first-lvl/first-lvl';

@Component({
  selector: 'app-school-tab',
  imports: [FirstLvl],
  templateUrl: './school-tab.html',
  styleUrl: './school-tab.scss',
})
export class SchoolTab {
  isLevelOneRunning = false;

  runLevelOne(){ this.isLevelOneRunning = true;}

}
