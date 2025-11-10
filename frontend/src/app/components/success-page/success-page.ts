import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './success-page.html',
  styleUrl: './success-page.css',
})
export class SuccessPage {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.clearCartOnSuccess();
  }
  private http = inject(HttpClient);

  private async clearCartOnSuccess(): Promise<void> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const url = `${environment.apiUrl}/api/v1/users/cart`;
      lastValueFrom(this.http.delete(url, { headers }));
      console.log('Cleared user cart after successful checkout.');
    } catch (err) {
      console.error(err);
    }
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
