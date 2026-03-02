import { HttpClient } from '@angular/common/http';
import { Injectable, signal, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  bookCoverImage: string;
  genre: string;
  description: string;
  availability: string;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<Book[]>([]);
  private favoriteItems = new BehaviorSubject<Book[]>([]);

  cartItems$ = this.cartItems.asObservable();
  favoriteItems$ = this.favoriteItems.asObservable();

  constructor(private http: HttpClient) {}
  cart = signal<any[]>([]);

  loadCart() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http.get<any>(`${environment.apiUrl}/api/v1/users/cart`, { headers }).subscribe({
      next: (data) => {
        this.cart.set(data.cart || []);
        this.cartItems.next(data.cart || []);
      },
      error: (err) => console.error(err),
    });
  }

  addToCart(bookId: string): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.post(`${environment.apiUrl}/api/v1/users/cart/${bookId}`, {}, { headers }).pipe(
      tap(() => this.loadCart())
    );
  }
}

