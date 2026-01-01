import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-concept-tab-frame',
  imports: [],
  templateUrl: './concept-tab-frame.html',
  styleUrl: './concept-tab-frame.scss',
})
export class ConceptTabFrame {
  @Input() hasStarted = false;
}
