import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCreateComponent } from './meal-create.component';

describe('MealCreateComponent', () => {
  let component: MealCreateComponent;
  let fixture: ComponentFixture<MealCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealCreateComponent]
    });
    fixture = TestBed.createComponent(MealCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
