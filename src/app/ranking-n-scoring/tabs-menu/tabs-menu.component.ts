import { Component, OnInit } from '@angular/core';
import { MenuItemI } from '../../shared/interfaces/menu-item.interface';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss']
})
export class TabsMenuComponent implements OnInit {

  public tabs: MenuItemI[];
  constructor() {
    this.tabs = [
      {
        title: 'Scoring & Ranking Points Calculator',
        path: './ranking',
        icon: 'dialpad'
      },
      {
        title: 'Performance Finder',
        path: './performances',
        icon: 'trending_up'
      },
      {
        title: 'Meetings',
        path: './meetings',
        icon: 'calendar_today'
      }
    ];
  }

  ngOnInit() {
  }

}
