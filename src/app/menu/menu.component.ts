import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { AppService } from '../app.service';
import { PwaService } from '../pwa/pwa.service';
import { ProfileService } from '../profile/profile.service';
import { ProfileEntity } from '../profile/entities/profile.entity';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

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
  public profile: ProfileEntity;

  constructor(private appService: AppService, private pwaService: PwaService, private profileService: ProfileService,
    private authService: AuthService) {
    this.profileService.getProfile().subscribe({ next: (profile: ProfileEntity) => this.profile = profile });

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
        path: '/rns/ranking',
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

  onLogOut() {
    this.authService.logout().subscribe();
  }
}
