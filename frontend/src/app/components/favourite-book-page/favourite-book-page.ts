import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Book } from '../../services/cart.service';
import { RouterModule, Router } from '@angular/router';
import { FavoritesService } from '../../services/favorite.service';

@Component({
  selector: 'app-favourite-book-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favourite-book-page.html',
  styleUrl: './favourite-book-page.css',
})
export class FavouriteBookPage implements OnInit {
  favoriteBooks: Book[] = [];
  isLoading = true;

  constructor(
    private cartService: CartService,
    private router: Router,
    private favourite: FavoritesService
  ) {}

  ngOnInit(): void {
    this.favourite.loadFavorites().subscribe({
      next: (res: any) => {
        this.favoriteBooks = res.favouriteBooks;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.favourite.loadFavorites().subscribe({
      next: (response: any) => {
        // Adjust based on your API response structure
        this.favoriteBooks = response.favouriteBook || response.data || response;
        console.log('Loaded favorites:', this.favoriteBooks);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.isLoading = false;
      },
    });
  }

  removeFromFavorites(bookId: string): void {
    this.favourite.remove(bookId);
    // Update local array immediately for better UX
    this.favoriteBooks = this.favoriteBooks.filter((book) => book._id !== bookId);
  }

  addToCart(book: Book): void {
    this.cartService.addToCart(book._id);
  }

  goToDetails(bookId: string): void {
    this.router.navigate(['/books', bookId]);
  }
}
