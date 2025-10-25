import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shop-page';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart.html'
})
export class AddToCart {
  @Input() book!: Book;
  @Output() addToCart = new EventEmitter<void>();

  onAddClick(): void {
    this.addToCart.emit();
  }
}
