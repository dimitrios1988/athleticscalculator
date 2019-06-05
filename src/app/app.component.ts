import { Component, ViewChild } from "@angular/core";

import { Platform, IonRouterOutlet } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { AdOptions, AdSize, AdPosition } from "capacitor-admob";
import { Plugins } from "@capacitor/core";
const { AdMob } = Plugins;
const bannerOptions: AdOptions = {
  adId: "ca-app-pub-9835906624473980/6495318174",
  adSize: AdSize.BANNER,
  position: AdPosition.BOTTOM_CENTER
};

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
      title: "Info",
      url: "/info",
      icon: "sign-text"
    }
  ];

  @ViewChild(IonRouterOutlet) nav: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    if(this.platform.is('hybrid')){
      AdMob.initialize("ca-app-pub-9835906624473980~5760519689");
    }
    this.initializeApp();
  }

  async initializeApp() {
    this.platform
      .ready()
      .then(() => {        
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      })
      .then(async () => {
        if(this.platform.is('hybrid')) {
          await AdMob.showBanner(bannerOptions);
        }
      });
  }

  isActive(page) {
    // Again the Tabs Navigation
    if (this.nav.isActivated) {
      return this.router.url === page.url;
    }
  }
}
