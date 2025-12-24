import { Component, signal } from '@angular/core';
import { TopBar } from './components/top-bar/top-bar';
import { BottomBar } from './components/bottom-bar/bottom-bar';

@Component({
  selector: 'app-root',
  imports: [TopBar, BottomBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
