import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupListComponent } from './device-group-list.component';

describe('DeviceGroupListComponent', () => {
  let component: DeviceGroupListComponent;
  let fixture: ComponentFixture<DeviceGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceGroupListComponent]
    });
    fixture = TestBed.createComponent(DeviceGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
