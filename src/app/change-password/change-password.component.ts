import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  userId: string | null = '';

  isLoading: boolean = false;
  successMessage: { summary: string, detail: string } | null = null;
  errorMessage: { summary: string, detail: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.userId = userInfo.userId;
    }
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid && this.userId) {
      const formValues = this.changePasswordForm.value;
      const payload = {
        userId: this.userId,
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword
      };

      this.isLoading = true;  
      this.successMessage = null;
      this.errorMessage = null;

      this.loginService.changePassword(payload).subscribe({
        next: () => {
          this.isLoading = false; 
          this.successMessage = { summary: 'Success', detail: 'Password changed successfully!' };
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          this.isLoading = false;  
          this.errorMessage = { summary: 'Error', detail: 'Please try again.' };
          console.error('Error:', error);
        }
      });
    }
  }
}
