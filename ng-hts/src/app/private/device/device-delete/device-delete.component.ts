import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-delete',
  templateUrl: './device-delete.component.html',
  styleUrls: ['./device-delete.component.css'],
})
export class DeviceDeleteComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) {}

  private id = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
  }

  deleteDevice(): void {
    if (this.id) {
      this.deviceService.deleteDevice(this.id).subscribe({
        next: () => {
          this.router.navigate(['/device']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.router.navigate(['/device']);
    }
  };
}
