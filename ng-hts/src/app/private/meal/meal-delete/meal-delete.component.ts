import { Component } from '@angular/core';
import { MealService } from '../meal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meal-delete',
  templateUrl: './meal-delete.component.html',
  styleUrls: ['./meal-delete.component.css']
})
export class MealDeleteComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private mealService: MealService,
    private router: Router
  ) {}

  private id = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
  }

  deleteMeal(): void {
    if (this.id) {
      this.mealService.deleteMeal(this.id).subscribe({
        next: () => {
          this.router.navigate(['/meal']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.router.navigate(['/meal']);
    }
  };

}
