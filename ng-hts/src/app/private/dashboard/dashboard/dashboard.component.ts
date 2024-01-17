import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) { }

  @ViewChild('weatherLoading') weatherLoading!: ElementRef;
  public weather = undefined as {
    current: {
      temperature_2m: number,
      apparent_temperature: number,
      is_day: number,
      precipitation: number,
      rain: number,
      showers: number,
      snowfall: number,
      weather_code: number,
      cloud_cover: number,
    },
    current_units: {
      temperature_2m: string,
      apparent_temperature: string,
      precipitation: string,
      rain: string,
      showers: string,
      snowfall: string,
    },
  } | undefined;

  public geo = undefined as {
    lat: number,
    lon: number,
    city: string,
  } | undefined;

  public now = new Date();

  ngOnInit(): void {
    this.httpClient.get("https://api.ipify.org?format=json").subscribe((ip_info: any) => {
      const { ip } = ip_info;
      this.httpClient.get(`http://ip-api.com/json/${ ip }`).subscribe((geo: any) => {
        this.geo = geo;
        this.httpClient.get(`https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover`).subscribe((weather: any) => {
          console.log(weather);
          this.weather = weather;
          if(this.weather!.current.is_day) {
            this.options = {
              path: 'assets/lotties/day_clear_sky.json',
            };
          } else {
            this.options = {
              path: 'assets/lotties/night_clear_sky.json',
            };
          }
          this.weatherLoading.nativeElement.style.backdropFilter = 'blur(0px)';
        });
      });
    });
    const timeToTheNextMinute = 1000 * 60 - (new Date().getTime() % (1000 * 60));
    setTimeout(() => {
      this.now = new Date();
      setInterval(() => {
        this.now = new Date();
      }, 1000 * 60);
    }, timeToTheNextMinute);
  }

  public options: AnimationOptions = {
    path: 'assets/lotties/mediterraneo.json',
  };


}
