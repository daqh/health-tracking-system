import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
