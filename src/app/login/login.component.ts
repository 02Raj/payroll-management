import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SharedUiComponent } from '../shared-ui/shared-ui.component';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  successMessage: { summary: string, detail: string } | null = null;
  errorMessage: { summary: string, detail: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); 
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const { username, password } = this.loginForm.value;

    this.loginService.login(username, password).subscribe(
      (response) => {
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

        this.successMessage = {
          summary: 'Login Successful',
          detail: 'Welcome ' + response.result.firstName + '!',
        };

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);
      },
      (error) => {
        this.isLoading = false;
        console.error('Login failed', error);
        this.errorMessage = {
          summary: 'Login Failed',
          detail: 'Please check your credentials and try again.',
        };
      }
    );
  }
}