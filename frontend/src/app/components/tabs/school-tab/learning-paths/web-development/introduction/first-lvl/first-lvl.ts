import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LevelFrame } from '../level-frame/level-frame';

@Component({
  selector: 'app-first-lvl',
  imports: [LevelFrame],
  templateUrl: './first-lvl.html',
  styleUrl: './first-lvl.scss',
})
export class FirstLvl {
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  forwardClosed() { this.openChange.emit(false); }
}
