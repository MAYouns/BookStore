// src/app/services/google-auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private clientId = '840442962743-kc23jk1m59fr8cgl8f3c12sa3go1iraa.apps.googleusercontent.com';
  data: object = {};

  constructor(private ngZone: NgZone) {}

  initializeButton() {
    const el = document.getElementById('google-signin-button');

    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(el, {
      theme: 'filled_black',
      size: 'large',
      type: 'standard',
      shape: 'rectangular',
      text: 'signin_with',
      logo_alignment: 'left',
    });
  }

  private handleCredentialResponse(response: any) {
    const token = response.credential;
    const decoded: any = jwtDecode(token);

    this.ngZone.run(() => {
      console.log('User info:', decoded);
      alert(`Welcome ${decoded.name} (${decoded.email})`);
      // send the data
    });
  }
}
