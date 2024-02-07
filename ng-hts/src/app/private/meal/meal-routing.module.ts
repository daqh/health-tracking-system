import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealCreateComponent } from './meal-create/meal-create.component';
import { MealDeleteComponent } from './meal-delete/meal-delete.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MealListComponent,
  },
  {
    path: 'create',
    component: MealCreateComponent,
  },
  {
    path: ':id/delete',
    component: MealDeleteComponent,
  },
  {
    path: ':id',
    component: MealDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealRoutingModule {}
