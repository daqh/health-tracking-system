import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
})
export class PrivateComponent implements OnInit {
  constructor(
    private msalService: MsalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  givenName = '';
  familyName = '';

  ngOnInit(): void {
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (activeAccount && activeAccount.idTokenClaims) {
      this.givenName = activeAccount.idTokenClaims['given_name'] as string;
    }
    if (activeAccount && activeAccount.idTokenClaims) {
      this.familyName = activeAccount.idTokenClaims['family_name'] as string;
    }
  }

  logout() {
    this.msalService.logout().subscribe(
      (response) => {
        console.log(response);
        this.msalService.instance.setActiveAccount(null);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getActiveAccount() {
    return this.msalService.instance.getActiveAccount();
  }
}
