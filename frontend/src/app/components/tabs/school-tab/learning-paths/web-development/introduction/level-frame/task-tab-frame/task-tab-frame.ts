import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-tab-frame',
  imports: [],
  templateUrl: './task-tab-frame.html',
  styleUrl: './task-tab-frame.scss',
})
export class TaskTabFrame {
  @Input() hasStarted = false;

}
