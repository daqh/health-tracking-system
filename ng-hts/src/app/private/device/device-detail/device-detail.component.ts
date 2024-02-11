import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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

  todaySteps = 0;
  lastWeight = 0;

  device?: DeviceDetail;

  public stepsChart: any;
  public weightChart: any;

  isPedometer = true;
  isScale = true;

  ngAfterViewInit(): void {
    const begin = moment().subtract(6, 'days').format('YYYY-MM-DD');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.deviceService.getDevice(id!, begin).subscribe((device) => {
      this.device = device;

      const measures = this.device.prismaDevice.measures.map((m) => {
        return {
          steps: m.steps,
          distance: m.distance,
          weight: m.weight,
          datetime: moment(m.datetime).format('YYYY-MM-DD'),
        };
      });

      const steps = new Map<string, number>();
      const distances = new Map<string, number>();
      const weights = new Map<string, number[]>();
      const weightDays = new Map<string, number>();

      measures.forEach((m) => {
        steps.set(m.datetime, (steps.get(m.datetime) || 0) + (m.steps || 0));
        distances.set(
          m.datetime,
          (distances.get(m.datetime) || 0) + (m.distance || 0)
        );
        if (m.weight) {
          weights.set(m.datetime, [
            ...(weights.get(m.datetime) || []),
            m.weight,
          ]);
        }
      });

      weights.forEach((w, k) => {
        weightDays.set(k, w.reduce((a, b) => a + b, 0) / w.length);
      });
      
      console.log(steps);
      console.log(distances);
      console.log(weights);
      console.log(weightDays);

      this.todaySteps = steps.get(moment().format('YYYY-MM-DD')) || 0;
      this.lastWeight = Array.from(weightDays.values()).pop() || 0;

      this.weightChart = new Chart(
        this.weightChartCanvas.nativeElement as HTMLCanvasElement,
        {
          type: 'line', //this denotes tha type of chart
          data: {
            labels: Array.from(weightDays.keys()),
            datasets: [
              {
                type: 'line', //this denotes tha type of chart
                data: Array.from(weightDays.values()),
                borderColor: 'green',
                label: 'Weight',
                fill: true,
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

      this.stepsChart = new Chart(
        this.stepsChartCanvas.nativeElement as HTMLCanvasElement,
        {
          type: 'bar', //this denotes tha type of chart
          data: {
            labels: Array.from(steps.keys()),
            datasets: [
              {
                type: 'line', //this denotes tha type of chart
                data: Array.from(distances.values()),
                borderColor: 'blue',
                label: 'Distance',
                fill: true,
              },
              {
                type: 'bar', //this denotes tha type of chart
                label: 'Steps',
                data: Array.from(steps.values()),
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
