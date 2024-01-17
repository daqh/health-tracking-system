import { Component } from '@angular/core';
import { Theme, ThemeService } from '../theme.service';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.css']
})
export class ToggleThemeComponent {

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    
  }

  getTheme() {
    return this.themeService.getTheme();
  }

  swapTheme() {
    const theme = this.themeService.getTheme();
    switch (theme) {
      case Theme.Light:
        this.themeService.setTheme(Theme.Dark);
        break;
      case Theme.Dark:
        this.themeService.setTheme(Theme.Auto);
        break;
      default:
        this.themeService.setTheme(Theme.Light);
        break;
    }
  }
}
