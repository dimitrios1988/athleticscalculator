import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output()
  private itemSelected: EventEmitter<void>;

  public menuItems: MenuItem[];

  constructor() {
    this.itemSelected = new EventEmitter<void>();
    this.menuItems = [
      {
        title: 'Ranking & Scoring Points',
        path: '/rns',
        icon: 'dialpad'
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

}
