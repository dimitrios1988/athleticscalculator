import { Component, ViewChild } from "@angular/core";

import { Platform, IonRouterOutlet } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Scoring & Ranking Points Calculator",
      url: "/ranking",
      icon: "calculator"
    },
    {
      title: "Performance Finder",
      url: "/performances",
      icon: "chart-line-variant"
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: "calendar-search"
    },
    {
      title: "Info",
      url: "/info",
      icon: "sign-text"
    },    
  ];

  @ViewChild(IonRouterOutlet) nav: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform
      .ready()
      .then(() => {        
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });      
  }

  isActive(page) {
    // Again the Tabs Navigation
    if (this.nav.isActivated) {
      return this.router.url === page.url;
    }
  }
}
