import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private msalService: MsalService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.msalService.initialize();
  }

  login() {
    this.msalService.loginPopup().subscribe((response) => {
      console.log('login response', response);
      this.msalService.instance.setActiveAccount(response.account);
      this.router.navigate(['/dashboard']);
    });
  }

}
