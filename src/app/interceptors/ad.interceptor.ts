import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AdOptions, AdSize, AdPosition } from "capacitor-admob";
import { Plugins } from "@capacitor/core";
import { Platform } from '@ionic/angular';
const { AdMob } = Plugins;
const bannerOptions: AdOptions = {
  adId: "ca-app-pub-9835906624473980/3018127654",
  autoShow: false
};

@Injectable({ providedIn: "root" })
export class AdInterceptor implements HttpInterceptor {
  constructor(private platform: Platform) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if ((req.method === "POST") && (this.platform.is('hybrid'))) {
      AdMob.prepareInterstitial(bannerOptions);
      // Subscibe Banner Event Listener
      AdMob.addListener("onAdLoaded", (info: boolean) => {
        AdMob.showInterstitial();
      });
    }

    return next.handle(req);
  }
}
