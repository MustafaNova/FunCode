import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-level-frame',
  imports: [],
  templateUrl: './level-frame.html',
  styleUrl: './level-frame.scss',
})
export class LevelFrame {
  @Input() hasStarted: boolean = false;
  @Output() closed = new EventEmitter<void>();

  emitClose() { this.closed.emit(); }

}
