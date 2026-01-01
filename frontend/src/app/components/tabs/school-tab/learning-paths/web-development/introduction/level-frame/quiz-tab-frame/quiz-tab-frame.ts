import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-tab-frame',
  imports: [],
  templateUrl: './quiz-tab-frame.html',
  styleUrl: './quiz-tab-frame.scss',
})
export class QuizTabFrame {
  @Input() hasStarted = false;

}
