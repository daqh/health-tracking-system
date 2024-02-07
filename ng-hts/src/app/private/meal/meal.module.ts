import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealService } from './meal.service';
import { MealRoutingModule } from './meal-routing.module';
import { MealCreateComponent } from './meal-create/meal-create.component';
import { MealDeleteComponent } from './meal-delete/meal-delete.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealListItemComponent } from './meal-list-item/meal-list-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MealCreateComponent,
    MealDeleteComponent,
    MealDetailComponent,
    MealListComponent,
    MealListItemComponent
  ],
  imports: [
    CommonModule,
    MealRoutingModule,
    FormsModule
  ],
  providers: [
    MealService
  ]
})
export class MealModule { }
