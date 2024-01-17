import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private msalService: MsalService,
  ) {}

  ngOnInit(): void {
    this.msalService.initialize();
  }

  login() {
    this.msalService.loginPopup().subscribe((response) => {
      console.log('login response', response);
      this.msalService.instance.setActiveAccount(response.account);
    });
  }

}
