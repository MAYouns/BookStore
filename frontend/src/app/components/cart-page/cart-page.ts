import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface Book {
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CheckoutDetails {
  receiverName: string;
  billingAddress: string;
  sendingAddress: string;
  province: string;
  contactNumber: string;
  cardNumber: string;
}

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  private http = inject(HttpClient);

  cartItems = signal<Book[]>([]);

  // NOTE: REPLACE THIS WITH YOUR ACTUAL BACKEND ENDPOINT
  private cartApiUrl = '/api/cart/items';

  showCheckoutModal = signal(false);
  isLoading = signal(true);

  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.price * item.quantity, 0);
  });

  checkoutDetails = signal<CheckoutDetails>({
    receiverName: '',
    billingAddress: '',
    sendingAddress: '',
    province: '',
    contactNumber: '',
    cardNumber: '',
  });

  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems(): void {
    this.isLoading.set(true);

    this.http
      .get<Book[]>(this.cartApiUrl)
      .pipe(tap(() => console.log(`Fetching cart items from: ${this.cartApiUrl}`)))
      .subscribe({
        next: (data) => {
          this.cartItems.set(data);
          this.isLoading.set(false);
          console.log('Cart items loaded successfully.');
        },
        error: (err) => {
          console.error('Failed to load cart items:', err);
          this.isLoading.set(false);
          const fallbackData: Book[] = [];
          this.cartItems.set(fallbackData);
        },
      });
  }

  updateQuantity(bookToUpdate: Book, newQuantity: number): void {
    if (newQuantity < 1) newQuantity = 1;

    this.cartItems.update((items) =>
      items.map((item) => (item === bookToUpdate ? { ...item, quantity: newQuantity } : item))
    );
  }

  onInputChange(field: keyof CheckoutDetails, value: string | number | null): void {
    this.checkoutDetails.update((currentDetails) => ({
      ...currentDetails,
      [field]: value,
    }));
  }

  openCheckoutModal(): void {
    if (this.cartItems.length === 0) {
      alert('Your Cart is Empty');
      return;
    }

    this.showCheckoutModal.set(true);
    console.log('Proceed to Checkout clicked! Opening modal.');
  }

  closeCheckoutModal(): void {
    this.showCheckoutModal.set(false);
    console.log('Closing checkout modal.');
    this.checkoutDetails.set({
      receiverName: '',
      billingAddress: '',
      sendingAddress: '',
      province: '',
      contactNumber: '',
      cardNumber: '',
    });
  }

  payNow(): void {
    console.log('Attempting payment with details:', this.checkoutDetails());
    // This is where you would make the final checkout API call.
    alert('Payment initiated! (Check console for details)');
    this.closeCheckoutModal();
  }
}
