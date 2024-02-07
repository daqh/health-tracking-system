import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable()
export class MealService {
  constructor(private httpClient: HttpClient) {}

  listMeals() {
    return this.httpClient.get<any[]>(
      `${environment.mealApiBaseUrl}/meal`
    );
  }

  createMeal(meal: any) {
    return this.httpClient.post<{ id: number }>(
      `${environment.mealApiBaseUrl}/meal`,
      meal
    );
  }

  deleteMeal(id: number | string) {
    return this.httpClient.delete(
      `${environment.mealApiBaseUrl}/meal/${id}`
    );
  }

  getMeal(id: string) {
    return this.httpClient.get(
      `${environment.mealApiBaseUrl}/meal/${id}`
    );
  }
}
