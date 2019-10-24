import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item';
import { AppService } from '../app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output()
  private itemSelected: EventEmitter<void>;

  public menuItems: MenuItem[];
  public isDarkTheme: boolean;

  constructor(private appService: AppService) {
    this.isDarkTheme = appService.isDarkTheme;
    this.itemSelected = new EventEmitter<void>();
    this.menuItems = [
      {
        title: 'Ranking & Scoring Points',
        path: '/rns',
        icon: 'star'
      },
      {
        title: 'Combined Events',
        path: '/combined',
        icon: 'dialpad'
      },
      {
        title: 'Info',
        path: '/info',
        icon: 'info'
      }
    ];
  }

  onItemSelected() {
    this.itemSelected.emit();
  }

  toggleTheme() {
    this.appService.toggleTheme();
    this.isDarkTheme = this.appService.isDarkTheme;
    this.onItemSelected();
  }

}
