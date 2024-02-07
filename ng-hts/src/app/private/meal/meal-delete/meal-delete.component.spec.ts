import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDeleteComponent } from './meal-delete.component';

describe('MealDeleteComponent', () => {
  let component: MealDeleteComponent;
  let fixture: ComponentFixture<MealDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealDeleteComponent]
    });
    fixture = TestBed.createComponent(MealDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
