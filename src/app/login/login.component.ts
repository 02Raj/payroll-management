import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SharedUiComponent } from '../shared-ui/shared-ui.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  isLoading: boolean = false;
  successMessage: { summary: string, detail: string } | null = null;
  errorMessage: { summary: string, detail: string } | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;
  
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        this.isLoading = false;
        console.log('Login successful', response);
        this.loginService.saveToken(response.jwt, response.refreshToken);
  
        const userInfo: any = {
          userId: response.result.userId,
          userName: response.result.userName,
          firstName: response.result.firstName,
          lastName: response.result.lastName,
          email: response.result.email,
          roleId: response.result.roleId,
          roleName: response.result.roleName,
          companyName: response.result.companyName,
        };
  
        if (response.result.roleName === 'superAdmin') {
          userInfo.superAdminCompanyId = response.result.companyId; 
        } else {
          userInfo.companyId = response.result.companyId; 
        }
  
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
  
        // Show success message
        this.successMessage = { summary: 'Login Successful', detail: 'Welcome ' + response.result.firstName + '!', };
  
        // Delay navigation to allow the success message to be displayed
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);  // 3-second delay to match the toast message duration
      },
      error => {
        this.isLoading = false;
        console.error('Login failed', error);
        this.errorMessage = { summary: 'Login Failed', detail: 'Please check your credentials and try again.', };
      }
    );
  }
  
}