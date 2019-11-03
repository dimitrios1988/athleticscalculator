import { Component, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item';
import { AppService } from '../app.service';
import { PwaService } from '../pwa/pwa.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

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
  public installPrompt;
  public isSignedIn: boolean;
  public user: User;

  constructor(private appService: AppService, private pwaService: PwaService, private userService: UserService) {
    this.isSignedIn = userService.isLoggedIn;
    this.user = this.userService.getProfile();
    this.pwaService.installPrompt$.subscribe({
      next: (e) => {
        e.preventDefault();
        this.installPrompt = e;
      }
    });
    this.isDarkTheme = appService.isDarkTheme();
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
    this.isDarkTheme = this.appService.isDarkTheme();
    this.onItemSelected();
  }

  onInstallApp() {
    if (this.installPrompt) {
      this.installPrompt.prompt();
      this.installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Your PWA has been installed');
        } else {
          console.log('User chose to not install your PWA');
        }
      });
    }
    this.onItemSelected();
  }

}
