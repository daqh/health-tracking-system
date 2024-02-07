import { Component } from '@angular/core';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent {

  constructor(private mealService: MealService) { }

  meals: any[] = [];

  ngOnInit() {
    this.mealService.listMeals().subscribe((meals) => {
      this.meals = meals;
    });
  }

}
