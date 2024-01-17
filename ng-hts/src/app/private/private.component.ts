import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  constructor(
    private msalService: MsalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log(this.msalService.instance.getActiveAccount());
  }

  logout() {
    this.msalService.logout().subscribe((response) => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    });
  }

  getActiveAccount() {
    return this.msalService.instance.getActiveAccount();
  }

}
