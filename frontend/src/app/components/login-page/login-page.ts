import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoogleAuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  constructor(private googleAuth: GoogleAuthService) {}
  ngAfterViewInit() {
    this.googleAuth.initializeButton();
  }

  type: string = 'password';
  data: object = {};
  myLogForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/),
    ]),
  });

  get emailValid() {
    return this.myLogForm.controls.email;
  }
  get passwordValid() {
    return this.myLogForm.controls.password;
  }
  showHidePassword() {
    if (this.type == 'password') this.type = 'text';
    else this.type = 'password';
  }
  addUser(password: HTMLInputElement, email: HTMLInputElement) {
    this.data = {
      em: email.value,
      pw: password.value,
    };
    console.log(this.data);
  }
}
