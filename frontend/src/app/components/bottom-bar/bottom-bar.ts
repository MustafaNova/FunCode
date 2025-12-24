import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bottom-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './bottom-bar.html',
  styleUrl: './bottom-bar.scss',
})
export class BottomBar {

  selected: String = "school";

  tabs = [
    {icon : "fa-school", label: "school", path: "/"},
    {icon : "fa-pen", label: "exercise", path: "/exercise" },
    {icon : "fa-trophy", label: "leaderboard", path: "/leaderboard"},
    {icon : "fa-user", label: "profil", path: "/profil"}

    ]

  select(id: String) {
    this.selected = id
  }

}
