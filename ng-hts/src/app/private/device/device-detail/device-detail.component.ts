import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../device.service';
import { DeviceDetail } from '../models/device.model';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css'],
})
export class DeviceDetailComponent implements AfterViewInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService
  ) {}

  @ViewChild('stepsChartCanvas') stepsChartCanvas!: ElementRef;
  @ViewChild('weightChartCanvas') weightChartCanvas!: ElementRef;

  device?: DeviceDetail;

  public stepsChart: any;
  public weightChart: any;

  isPedometer = true;
  isScale = true;

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.deviceService.getDevice(id!).subscribe((device) => {
      this.device = device;

      const steps = this.device.prismaDevice.measures.map((m) => m.steps).filter((w) => w != null);
      const distances = this.device.prismaDevice.measures.map((m) => m.distance).filter((w) => w != null);
      this.isPedometer = steps.length > 0;
      const weights = this.device.prismaDevice.measures.map((m) => m.weight).filter((w) => w != null);
      this.isScale = weights.length > 0;
      
      this.stepsChart = new Chart(
        this.stepsChartCanvas.nativeElement as HTMLCanvasElement,
        {
          type: 'bar', //this denotes tha type of chart
          data: {
            labels: this.device.prismaDevice.measures.map((m) => {
              const date = moment(m.datetime);
              return date.format('DD/MM/YYYY HH:mm');
            }),
            datasets: [
              {
                type: 'line', //this denotes tha type of chart
                data: distances,
                borderColor: 'blue',
                label: 'Distance',
                fill: true,
              },
              {
                type: 'bar', //this denotes tha type of chart
                label: 'Steps',
                data: steps,
                backgroundColor: 'lightgreen',
              },
            ],
          },
          options: {
            responsive: true,
            hover: {
              mode: 'index',
              intersect: true,
            },
          },
        }
      );

    });
  }

}
