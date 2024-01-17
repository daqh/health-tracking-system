import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeListItemComponent } from './device-type-list-item.component';

describe('DeviceTypeListItemComponent', () => {
  let component: DeviceTypeListItemComponent;
  let fixture: ComponentFixture<DeviceTypeListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceTypeListItemComponent]
    });
    fixture = TestBed.createComponent(DeviceTypeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
