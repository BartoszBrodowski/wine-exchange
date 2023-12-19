import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent {
  private usernamePattern = '^[a-zA-Z0-9_]{3,20}$';
  private passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  protected registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required, Validators.pattern(this.passwordPattern)],
    confirmPassword: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
