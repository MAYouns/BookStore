import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './success-page.html',
  styleUrl: './success-page.css',
})
export class SuccessPage {
  constructor(private router: Router) {}

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
