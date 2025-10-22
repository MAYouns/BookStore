import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  genre: string;
  description: string;
  availability: string;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Book[]>([]);
  private favoriteItems = new BehaviorSubject<Book[]>([]);

  cartItems$ = this.cartItems.asObservable();
  favoriteItems$ = this.favoriteItems.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');

    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }

    if (savedFavorites) {
      this.favoriteItems.next(JSON.parse(savedFavorites));
    }
  }

  addToCart(book: Book): void {
    const currentCart = this.cartItems.value;
    const existingBook = currentCart.find(item => item.id === book.id);

    if (!existingBook) {
      const updatedCart = [...currentCart, book];
      this.cartItems.next(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  removeFromCart(bookId: number): void {
    const updatedCart = this.cartItems.value.filter(item => item.id !== bookId);
    this.cartItems.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  getCartItems(): Book[] {
    return this.cartItems.value;
  }

  getCartCount(): number {
    return this.cartItems.value.length;
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  isInCart(bookId: number): boolean {
    return this.cartItems.value.some(item => item.id === bookId);
  }

  addToFavorites(book: Book): void {
    const currentFavorites = this.favoriteItems.value;
    const existingBook = currentFavorites.find(item => item.id === book.id);

    if (!existingBook) {
      const updatedFavorites = [...currentFavorites, { ...book, isFavorite: true }];
      this.favoriteItems.next(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  }

  removeFromFavorites(bookId: number): void {
    const updatedFavorites = this.favoriteItems.value.filter(item => item.id !== bookId);
    this.favoriteItems.next(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  getFavoriteItems(): Book[] {
    return this.favoriteItems.value;
  }

  getFavoritesCount(): number {
    return this.favoriteItems.value.length;
  }

  isFavorite(bookId: number): boolean {
    return this.favoriteItems.value.some(item => item.id === bookId);
  }

  toggleFavorite(book: Book): void {
    if (this.isFavorite(book.id)) {
      this.removeFromFavorites(book.id);
    } else {
      this.addToFavorites(book);
    }
  }
}
