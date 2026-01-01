import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GoalTabFrame } from './goal-tab-frame/goal-tab-frame';
import { QuizTabFrame } from './quiz-tab-frame/quiz-tab-frame';
import { ConceptTabFrame } from './concept-tab-frame/concept-tab-frame';
import { TaskTabFrame } from './task-tab-frame/task-tab-frame';

type levelFrameTab = 'goal' | 'concept' | 'quiz' | 'task';

@Component({
  selector: 'app-level-frame',
  imports: [GoalTabFrame,
    QuizTabFrame, ConceptTabFrame, TaskTabFrame],
  templateUrl: './level-frame.html',
  styleUrl: './level-frame.scss',
})
export class LevelFrame {
  @Input() hasStarted = false;
  @Output() closed = new EventEmitter<void>();
  activeTab: levelFrameTab = 'goal';

  setActiveTab(tab: levelFrameTab) { this.activeTab = tab; }
  isTabActive(tab: levelFrameTab) { return this.activeTab == tab;}


  emitClose() { this.closed.emit(); }
}
