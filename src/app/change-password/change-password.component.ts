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
    console.log('Form Valid:', this.changePasswordForm.valid);  // Temporary check
    console.log('Form Values:', this.changePasswordForm.value); // Log form values
  
    if (this.changePasswordForm.valid && this.userId) {
      const formValues = this.changePasswordForm.value;
      const payload = {
        userId: this.userId,
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword
      };
  
      this.loginService.changePassword(payload).subscribe({
        next: () => {
          alert('Password changed successfully!');
          this.router.navigate(['/login']); 
        },
        error: (error: any) => {
          alert('Failed to change password. Please try again.');
          console.error('Password change error:', error);
        }
      });
    }
  }
  
}
