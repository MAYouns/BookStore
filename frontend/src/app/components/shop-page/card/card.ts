import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Book } from '../../../services/cart.service';
import { CartService } from '../../../services/cart.service';
import { FavoritesService } from '../../../services/favorite.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.html',
})
export class Card {
  @Input() book!: Book;
  @Output() addToCart = new EventEmitter<void>();
  @Output() toggleFavorite = new EventEmitter<void>();
  isLogin = localStorage['token'];
  isAddingToCart = false;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {}

  onAddToCart(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.isAddingToCart) return;
    this.isAddingToCart = true;
    this.cartService.addToCart(this.book._id).subscribe({
      next: () => {
        this.isAddingToCart = false;
      },
      error: () => {
        this.isAddingToCart = false;
      },
    });
  }

  onToggleFavorite(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (!this.book.isFavorite) {
      this.favoritesService.add(this.book._id);
      this.book.isFavorite = true;
    } else {
      this.favoritesService.remove(this.book._id);
      this.book.isFavorite = false;
    }
  }

  goToDetails(): void {
    this.router.navigate(['/books', this.book._id]);
  }
  gotoLogin(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.router.navigate(['/login']);
  }
}

