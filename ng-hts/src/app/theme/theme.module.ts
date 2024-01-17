import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';
import { ThemeService } from './theme.service';



@NgModule({
  declarations: [
    ToggleThemeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleThemeComponent
  ],
  providers: [
    ThemeService
  ]
})
export class ThemeModule { }
