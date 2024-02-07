import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private msalService: MsalService) {
    msalService.initialize();
    console.log(environment)
  }

}
