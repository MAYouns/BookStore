import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Book } from '../shop-page/services/cart.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-favourite-book-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favourite-book-page.html',
  styleUrl: './favourite-book-page.css'
})
export class FavouriteBookPage implements OnInit {
  favoriteBooks: Book[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();

    this.cartService.favoriteItems$.subscribe(items => {
      this.favoriteBooks = items;
    });
  }

  loadFavorites(): void {
    this.favoriteBooks = this.cartService.getFavoriteItems();
  }

  removeFromFavorites(bookId: number): void {
    this.cartService.removeFromFavorites(bookId);
  }

  addToCart(book: Book): void {
    this.cartService.addToCart(book);
  }

  goToDetails(bookId: number): void {
    this.router.navigate(['/shop', bookId]);
  }
}
