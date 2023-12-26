import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/features/services/user.service';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  protected user = {} as User;

  private usernamePattern: string = '^[a-zA-Z0-9_]{3,20}$';
  private passwordPattern: string =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  protected userId: string = '';
  protected userForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
  }); 

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') as string;
    this.userService.getUserById(this.userId).subscribe((response: ApiResponse) => {
      this.user = response.body;
      this.userForm.patchValue({
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      });
      console.log(this.userForm.value.id)
    });
  }

  protected get id(): AbstractControl<string> | null {
    console.log('ID', this.userForm.value.id);
    return this.userForm.get('id');
  }

  protected get username(): AbstractControl<string> | null {
    return this.userForm.get('username');
  }

  protected get email(): AbstractControl<string> | null {
    return this.userForm.get('email');
  }

  protected get password(): AbstractControl<string> | null {
    return this.userForm.get('password');
  }



  submitDetails(event: Event): void {
    const updatedUser: User = {
      id: this.userForm.value.id as string,
      username: this.userForm.value.username as string,
      email: this.userForm.value.email as string,
      password: this.userForm.value.password as string,
    };
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to update your user data?',
      header: 'Update your data',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.userService.updateUser(updatedUser).subscribe({
          next: () => {
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Confirmed', 
              detail: 'User updated', 
              life: 3000 
            });
          }, 
          error: (err: HttpErrorResponse) => {
            const errorMessage: string = err.error.message || 'An error occurred';
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: errorMessage, 
              life: 3000 
            });
          }
        });
      },
    });
  }
}
