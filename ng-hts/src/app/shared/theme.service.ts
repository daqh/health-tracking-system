import { Injectable } from '@angular/core';
import { SharedModule } from './shared.module';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Auto = 'auto'
}

@Injectable({
  providedIn: SharedModule
})
export class ThemeService {

  private theme: Theme = Theme.Auto;

  constructor() {
    const theme = localStorage.getItem('theme') as Theme || Theme.Auto;
    this.setTheme(theme);
  }
  
  getTheme() {
    return this.theme;
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }

}
