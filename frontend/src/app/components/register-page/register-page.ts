import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  type = 'password';
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
}
