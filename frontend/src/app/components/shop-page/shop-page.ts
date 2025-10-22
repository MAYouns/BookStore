import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Filter, FilterCriteria } from './filter/filter';
import { Card } from './card/card';
import { BookService } from './services/book.service';
import { CartService, Book } from './services/cart.service';

export type { Book };

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, Filter, Card, HttpClientModule],
  providers: [BookService],
  templateUrl: './shop-page.html'
})
export class ShopPage implements OnInit {
  currentFilter: FilterCriteria = {
    searchQuery: '',
    category: '',
    minPrice: null,
    maxPrice: null
  };

  books: Book[] = [];
  filteredBooks: Book[] = [];
  favoritesCount: number = 0;

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadBooks();

    this.cartService.favoriteItems$.subscribe(favorites => {
      this.favoritesCount = favorites.length;
      this.updateBookFavoriteStatus();
    });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('Loaded books:', data);
        this.books = data.map(book => ({
          ...book,
          isFavorite: this.cartService.isFavorite(book.id)
        }));
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }

  updateBookFavoriteStatus(): void {
    this.books = this.books.map(book => ({
      ...book,
      isFavorite: this.cartService.isFavorite(book.id)
    }));
    this.applyFilters();
  }

  onFilterChange(filterCriteria: FilterCriteria): void {
    this.currentFilter = filterCriteria;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.books];

    if (this.currentFilter.searchQuery && this.currentFilter.searchQuery.trim() !== '') {
      const query = this.currentFilter.searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }

    if (this.currentFilter.category && this.currentFilter.category !== '' && this.currentFilter.category !== 'All') {
      result = result.filter(book =>
        book.genre === this.currentFilter.category
      );
    }

    if (this.currentFilter.minPrice !== null) {
      result = result.filter(book => book.price >= this.currentFilter.minPrice!);
    }

    if (this.currentFilter.maxPrice !== null) {
      result = result.filter(book => book.price <= this.currentFilter.maxPrice!);
    }

    this.filteredBooks = result;
    console.log('Filtered books:', this.filteredBooks.length);
  }

  onAddToCart(book: Book): void {
    this.cartService.addToCart(book);
    console.log('Added to cart:', book);
  }

  onToggleFavorite(book: Book): void {
    this.cartService.toggleFavorite(book);
    const bookToUpdate = this.books.find(b => b.id === book.id);
    if (bookToUpdate) {
      bookToUpdate.isFavorite = this.cartService.isFavorite(book.id);
    }
  }
}
