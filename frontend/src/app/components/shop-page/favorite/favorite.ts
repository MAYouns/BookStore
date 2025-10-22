import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.html'
})
export class Favorite {
  @Input() isFavorite = false;
  @Output() toggleFavorite = new EventEmitter<void>();

  onToggleClick(): void {
    this.toggleFavorite.emit();
  }
}
