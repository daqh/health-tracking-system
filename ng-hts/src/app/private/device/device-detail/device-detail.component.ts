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

      const steps = this.device.prismaDevice.measures.map((m) => m.steps).filter((w) => w != null);
      const distances = this.device.prismaDevice.measures.map((m) => m.distance).filter((w) => w != null);
      this.isPedometer = steps.length > 0;
      const weights = this.device.prismaDevice.measures.map((m) => m.weight).filter((w) => w != null);
      this.isScale = weights.length > 0;
      const datetimes = this.device.prismaDevice.measures.map((m) => moment(m.datetime).format('YYYY-MM-DD HH:mm'));

      // Aggregate the measures by day
      let stepsByDay = [];
      let distancesByDay = [];
      let days = [];

      for (let i = 0; i < datetimes.length; i++) {
        let day = moment(datetimes[i]).format('YYYY-MM-DD');
        if (days.indexOf(day) === -1) {
          days.push(day);
          stepsByDay.push(0);
          distancesByDay.push(0);
        }
        let index = days.indexOf(day);
        stepsByDay[index] += steps[i] || 0;
        distancesByDay[index] += distances[i] || 0;
      }
    
      let weightsByDay = [];
      let weightDays = [];
      for (let i = 0; i < datetimes.length; i++) {
        let day = moment(datetimes[i]).format('YYYY-MM-DD');
        if (weightDays.indexOf(day) === -1) {
          weightDays.push(day);
          weightsByDay.push(0);
        }
        let index = weightDays.indexOf(day);
        weightsByDay[index] = weights[i] || 0;
      }

      this.lastWeight = weightsByDay[weightsByDay.length - 1];

      this.todaySteps = stepsByDay[stepsByDay.length - 1];

      this.weightChart = new Chart(
        this.weightChartCanvas.nativeElement as HTMLCanvasElement,
        {
          type: 'line', //this denotes tha type of chart
          data: {
            labels: weightDays,
            datasets: [
              {
                type: 'line', //this denotes tha type of chart
                data: weightsByDay,
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
            labels: days,
            datasets: [
              {
                type: 'line', //this denotes tha type of chart
                data: distancesByDay,
                borderColor: 'blue',
                label: 'Distance',
                fill: true,
              },
              {
                type: 'bar', //this denotes tha type of chart
                label: 'Steps',
                data: stepsByDay,
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
