import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { ShopPage } from './components/shop-page/shop-page';
import { BookDetailsPage } from './components/book-details-page/book-details-page';
import { CartPage } from './components/cart-page/cart-page';
import { AboutPage } from './components/about-page/about-page';
import { FavouriteBookPage } from './components/favourite-book-page/favourite-book-page';
import { LoginPage } from './components/login-page/login-page';
import { RegisterPage } from './components/register-page/register-page';
import { DashboardComponent } from './components/dashboard/dashboard';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'shop', component: ShopPage },
  { path: 'bookDetails', component: BookDetailsPage },
  { path: 'cart', component: CartPage },
  { path: 'about', component: AboutPage },
  { path: 'favouriteBooks', component: FavouriteBookPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: NotFound },
];
