import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GoalTabFrame } from './goal-tab-frame/goal-tab-frame';
import { QuizTabFrame } from './quiz-tab-frame/quiz-tab-frame';
import { ConceptTabFrame } from './concept-tab-frame/concept-tab-frame';
import { TaskTabFrame } from './task-tab-frame/task-tab-frame';

type levelFrameTab = 'goal' | 'concept' | 'quiz' | 'task' | 'end';

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
  private readonly tabs: levelFrameTab[] = ["goal", "concept", "quiz", "task", "end"];

  isTabActive(tab: levelFrameTab) { return this.activeTab == tab;}
  goToNextTab() {
    const curIndex = this.tabs.indexOf(this.activeTab);
    this.activeTab = this.tabs[curIndex + 1];
  }

  emitClose() { this.closed.emit(); }
}
