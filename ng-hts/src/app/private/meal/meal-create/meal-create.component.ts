import { Component } from '@angular/core';
import { MealService } from '../meal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.component.html',
  styleUrls: ['./meal-create.component.css']
})
export class MealCreateComponent {

  constructor(
    private mealService: MealService,
    private router: Router,
  ) { }

  meal: any = {
    name: '',
    kcal: undefined,
    protein: null,
    fat: null,
    carbohydrate: null
  };

  onSubmit(event: any) {
    this.mealService.createMeal(this.meal).subscribe({
      next: (data) => {
        this.router.navigate(['/meal']);
      },
    });
  }

}
