import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Filter, FilterCriteria } from './filter/filter';
import { BookService } from '../../services/book.service';
import { CartService, Book } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorite.service';
import { Card } from './card/card';

export type { Book };

import { fadeAnimation, listStagger } from '../../animations';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, Filter, HttpClientModule, Card],
  providers: [BookService],
  templateUrl: './shop-page.html',
  styleUrls: ['./shop-page.css'],
  animations: [listStagger, fadeAnimation]
})
export class ShopPage implements OnInit {
  currentFilter: FilterCriteria = {
    searchQuery: '',
    category: '',
    minPrice: null,
    maxPrice: null,
  };

  books: Book[] = [];
  filteredBooks: Book[] = [];
  paginatedBooks: Book[] = [];
  favoritesCount: number = 0;
  isLoading: boolean = true;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.favoritesService.loadFavorites();
    this.favoritesCount = this.favoritesService.favourite().length;

    this.updateBookFavoriteStatus(this.favoritesService.favourite());
    // Subscribe to favorites changes for real-time counter update
    this.favoritesService.favorites$.subscribe((favorites) => {
      this.favoritesCount = favorites.length;
      this.updateBookFavoriteStatus(favorites);
    });
  }

  loadBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.isLoading = false;
      },
    });
  }

  loadFavorites(): void {
    this.favoritesService.loadFavorites();
  }

  updateBookFavoriteStatus(favorites: Book[]): void {
    const favoriteIds = favorites.map((fav) => fav._id);
    this.books = this.books.map((book) => ({
      ...book,
      isFavorite: favoriteIds.includes(book._id),
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
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
      );
    }

    if (
      this.currentFilter.category &&
      this.currentFilter.category !== '' &&
      this.currentFilter.category !== 'All'
    ) {
      result = result.filter((book) => book.genre === this.currentFilter.category);
    }

    if (this.currentFilter.minPrice !== null) {
      result = result.filter((book) => book.price >= this.currentFilter.minPrice!);
    }

    if (this.currentFilter.maxPrice !== null) {
      result = result.filter((book) => book.price <= this.currentFilter.maxPrice!);
    }

    this.filteredBooks = result;
    this.currentPage = 1;
    this.updatePaginatedBooks();
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    let start = this.currentPage - 1;
    let end = this.currentPage + 1;
    
    // Adjust bounds
    if (start < 1) {
      start = 1;
      end = 3;
    }
    if (end > total) {
      end = total;
      start = total - 2;
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  updatePaginatedBooks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = this.filteredBooks.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedBooks();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  onAddToCart(): void {
    // Handled in card component directly now, but we can refresh cart or UI here if needed
  }

  onToggleFavorite(): void {
    // The favorite toggle is now handled in the card component
    // This method just updates the filters to reflect the new state
    this.applyFilters();
  }
}

