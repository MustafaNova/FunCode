import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-goal-tab-frame',
  imports: [],
  templateUrl: './goal-tab-frame.html',
  styleUrl: './goal-tab-frame.scss',
})
export class GoalTabFrame {
  @Input() hasStarted = false;

}
