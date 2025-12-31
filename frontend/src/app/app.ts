import { Component } from '@angular/core';
import { TopBar } from './components/top-bar/top-bar';
import { BottomBar } from './components/bottom-bar/bottom-bar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [TopBar, BottomBar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
