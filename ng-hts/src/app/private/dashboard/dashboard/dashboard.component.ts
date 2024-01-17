import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private msalService: MsalService) {
    msalService.initialize().subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    console.log(this.msalService.instance.getActiveAccount());
  }

  login() {
    this.msalService.loginPopup().subscribe((response) => {
      console.log(response);
      this.msalService.instance.setActiveAccount(response.account);
    });
  }

  logout() {
    this.msalService.logoutPopup().subscribe((response) => {
      console.log(response);
    });
  }

  isLoggedIn() {
    return this.msalService.instance.getActiveAccount() != null;
  }

}
