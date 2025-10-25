import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  isLogin = localStorage['token'];
  list = ['Home', 'shop', 'About'];
  userList = ['Dashboard', 'Sign out'];
  name = localStorage.getItem('username');
  email = localStorage.getItem('email');

  linkStyle =
    'block py-2 px-3 rounded-sm hover:bg-[var(--primary-color)] md:hover:bg-transparent md:hover:text-[var(--primary-color)] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';
  linkStyleUser =
    'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white';
  ngAfterViewInit(): void {
    initFlowbite();
  }
  signOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  toggleMenu() {
    const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-user"]') as HTMLElement;
    if (toggleBtn) {
      toggleBtn.click();
    }
  }
}
