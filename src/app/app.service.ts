import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Option } from './option.entity';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public isDarkTheme: boolean;
  private appOptions: Option;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.appOptions = JSON.parse(localStorage.getItem('appOptions'));
    if (isNullOrUndefined(this.appOptions)) {
      this.appOptions = new Option();
      this.setLightTheme();
    } else if (this.appOptions.DarkTheme) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  public setLightTheme() {
    this.loadStyle('light-theme');
    this.appOptions.DarkTheme = false;
    this.saveOptions();
  }

  public setDarkTheme() {
    this.loadStyle('dark-theme');
    this.appOptions.DarkTheme = true;
    this.saveOptions();
  }

  public toggleTheme() {
    if (this.isDarkTheme) {
      this.setLightTheme();
      this.appOptions.DarkTheme = false;
      this.saveOptions();
    } else {
      this.setDarkTheme();
      this.appOptions.DarkTheme = true;
      this.saveOptions();
    }
  }

  private saveOptions() {
    localStorage.setItem('appOptions', JSON.stringify(this.appOptions));
  }

  private loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const themeLink = this.document.getElementById('client-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName + '.css';
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = styleName + '.css';

      head.appendChild(style);
    }
  }

}
