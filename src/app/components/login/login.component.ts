import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public constructor(private fb: FormBuilder) {}

  protected get email(): AbstractControl<string> | null {
    return this.loginForm.get('email');
  }

  protected get password(): AbstractControl<string> | null {
    return this.loginForm.get('password');
  }

  protected loginUser(): boolean {
    return true;
  }
}
