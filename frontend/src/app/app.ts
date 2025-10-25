import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { Footer } from './components/footer/footer';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, FormsModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
  navbar = true;
  pages = ['/', '/home', '/shop', '/book', '/cart', '/about', '/favourite'];

  constructor(private router: Router) {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
      console.log(e.url);
      this.navbar = !this.pages.includes(e.url) ? false : true;
    });
  }
  ngOnInit(): void {
    initFlowbite();
  }
}
