import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage {
  heroImage = '/assets/home-hero.png'; 

  bestPicks = [
    { id: 1, title: 'Thunmanhandiya', author: 'Mahagamagekara', cover: '/assets/covers/cover1.jpg' },
    { id: 2, title: 'Gamperaliya', author: 'Martin Wickramasinghe', cover: '/assets/covers/cover2.jpg' },
    { id: 3, title: 'Nectar in a Sieve', author: 'Kamala Markandaya', cover: '/assets/covers/cover3.jpg' },
    { id: 4, title: 'Adaraneeya Victoria', author: 'Mohan Raj Madawala', cover: '/assets/covers/cover4.jpg' }
  ];

  shelfImage = '/assets/bookshelf.png'; 

  currentSlide = 0;
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.bestPicks.length;
  }
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.bestPicks.length) % this.bestPicks.length;
  }
}
