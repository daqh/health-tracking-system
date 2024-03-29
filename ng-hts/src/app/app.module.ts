import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';

import {
  PublicClientApplication,
  InteractionType,
  IPublicClientApplication,
} from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ThemeModule } from './theme/theme.module';
import { environment } from 'src/environment/environment';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: environment.msal.authority,
      redirectUri: environment.msal.redirectUri,
      knownAuthorities: environment.msal.knownAuthorities,
      postLogoutRedirectUri: '/'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'https://healthtrackingsystem.onmicrosoft.com/9957c3a0-ca9d-4422-86b6-e9c0a851dee8/Measure.Read',
  ]);
  protectedResourceMap.set(environment.deviceApiBaseUrl, [
    'https://healthtrackingsystem.onmicrosoft.com/9957c3a0-ca9d-4422-86b6-e9c0a851dee8/Measure.Read',
  ]);
  protectedResourceMap.set(environment.mealApiBaseUrl, [
    'https://healthtrackingsystem.onmicrosoft.com/9957c3a0-ca9d-4422-86b6-e9c0a851dee8/Measure.Read',
  ]);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    loginFailedRoute: '/',
    authRequest: {
      scopes: ['https://healthtrackingsystem.onmicrosoft.com/9957c3a0-ca9d-4422-86b6-e9c0a851dee8/Measure.Read'],
    },
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    SharedModule,
    ThemeModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
