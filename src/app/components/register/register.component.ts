import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/features/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private usernamePattern: string = '^[a-zA-Z0-9_]{3,20}$';
  private passwordPattern: string =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  protected registerForm: FormGroup = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.usernamePattern)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(this.passwordPattern)],
    ],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatchValidator });

  public constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  protected get username(): AbstractControl<string> | null {
    return this.registerForm.get('username');
  }

  protected get email(): AbstractControl<string> | null {
    return this.registerForm.get('email');
  }

  protected get password(): AbstractControl<string> | null {
    return this.registerForm.get('password');
  }

  protected get confirmPassword(): AbstractControl<string> | null {
    return this.registerForm.get('confirmPassword');
  }

  protected submitDetails(): void {
    const postData: User = { ...this.registerForm.value };
    
    delete postData.confirmPassword;
    this.authService.register(postData as User)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User registered successfully!',
          });
          this.router.navigateByUrl('/login');
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage: string = err.error.message || 'An error occurred';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
        }
      });
  }
}
