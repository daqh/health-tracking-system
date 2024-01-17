import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(
    private msalService: MsalService,
    private router: Router
  ) { }

  getActiveAccount() {
    const activeAccount = this.msalService.instance.getActiveAccount();
    return activeAccount;
  }

  ngOnInit(): void {
    this.msalService.initialize();
  }

  login() {
    this.msalService.loginPopup().subscribe((response) => {
      this.msalService.instance.setActiveAccount(response.account);
      this.router.navigate(['/dashboard']);
    });
  }

  logout() {
    this.msalService.logout().subscribe((response) => {
      this.msalService.instance.setActiveAccount(null);
      this.router.navigate(['/']);
    });
  }

}
