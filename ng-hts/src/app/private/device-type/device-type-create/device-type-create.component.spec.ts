import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeCreateComponent } from './device-type-create.component';

describe('DeviceTypeCreateComponent', () => {
  let component: DeviceTypeCreateComponent;
  let fixture: ComponentFixture<DeviceTypeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceTypeCreateComponent]
    });
    fixture = TestBed.createComponent(DeviceTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
