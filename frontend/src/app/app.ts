import { Component, signal, OnInit } from '@angular/core';
import { 
  NavigationEnd, 
  NavigationStart, 
  NavigationCancel, 
  NavigationError, 
  Router, 
  RouterOutlet, 
  Event as RouterEvent 
} from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { Footer } from './components/footer/footer';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { routeTransition } from './animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, FormsModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeTransition]
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  navbar = true;
  pages = ['/', '/home', '/shop', '/cart', '/about', '/favourite', '/books/:id'];
  
  progress = 0;
  private progressInterval: any;
  isRouting = false;
  progressComplete = false;

  constructor(public router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      // Toggle progress bar based on routing status
      if (event instanceof NavigationStart) {
        this.isRouting = true;
        this.progressComplete = false;
        this.progress = 5;
        
        clearInterval(this.progressInterval);
        this.progressInterval = setInterval(() => {
          if (this.progress < 85) {
            this.progress += Math.random() * 5 + 1; // Increment randomly between 1 and 6
          }
        }, 100);
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        clearInterval(this.progressInterval);
        this.progress = 100;
        this.isRouting = false;
        
        setTimeout(() => {
          this.progressComplete = true;
          // Reset progress after fade out
          setTimeout(() => {
             this.progress = 0;
          }, 300);
        }, 300);
      }

      // Existing navbar logic
      if (event instanceof NavigationEnd) {
        this.navbar = this.pages.some((page) => {
          if (page.includes(':')) {
            const base = page.split('/:')[0];
            return event.url.startsWith(base);
          }
          return event.url === page;
        });
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
