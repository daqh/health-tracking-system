import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LottieModule } from 'ngx-lottie';
import { MealModule } from '../meal/meal.module';
import { MeasureModule } from '../measure/measure.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    LottieModule,
    DashboardRoutingModule,
    MealModule,
    MeasureModule
  ],
})
export class DashboardModule { }
