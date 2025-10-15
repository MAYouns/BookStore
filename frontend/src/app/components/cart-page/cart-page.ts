import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  cartItems = signal<Book[]>([
    {
      title: 'Manikkawatha',
      author: 'Mahinda Prasad Masimbula',
      price: 900,
      imageUrl: 'assets/manikkawatha-book.png',
      quantity: 1,
    },
    {
      title: 'The Second Book',
      author: 'Another Author',
      price: 800,
      imageUrl: 'assets/another-book.png',
      quantity: 2,
    },
  ]);

  showCheckoutModal = signal(false);

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

  updateQuantity(bookToUpdate: Book, newQuantity: number): void {
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
    console.log('Paying now with details:', this.checkoutDetails());
    alert('Payment initiated! (Check console for details)');
    this.closeCheckoutModal();
  }
}
