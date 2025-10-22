import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AddToCart } from '../add-to-cart/add-to-cart';
import { Favorite } from '../favorite/favorite';
import { Book } from '../shop-page';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, AddToCart, Favorite, RouterModule],
  templateUrl: './card.html',
})
export class Card {
  @Input() book!: Book;
  @Output() addToCart = new EventEmitter<Book>();
  @Output() toggleFavorite = new EventEmitter<Book>();

  constructor(private router: Router) {}

  onAddToCart(): void {
    this.addToCart.emit(this.book);
  }

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.book);
  }

  goToDetails(): void {
    this.router.navigate(['/shop', this.book.id]);
  }
}
