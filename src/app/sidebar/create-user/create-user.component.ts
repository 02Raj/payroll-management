import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  // UI State
  isLoading: boolean = false;
  successMessage: { summary: string, detail: string } | null = null;
  errorMessage: { summary: string, detail: string } | null = null;

  userId: string | null = null; 
  userForm: FormGroup; 
  companies: any[] = []; 
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 1;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form with the required fields
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], 
      email: ['', [Validators.required, Validators.email]],
      role: ['companyAdmin', Validators.required],
      companyId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log('UserId from route:', this.userId);

    if (this.userId) {
      // Editing existing user, so remove password validation
      this.removePasswordValidation();
      this.loadUserData(this.userId);
    }

    this.fetchCompanies();
  }

  // Function to remove password validation when editing a user
  removePasswordValidation(): void {
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
  }

  fetchCompanies(): void {
    this.companyService.getAllCompanies(this.currentPage, this.pageSize).subscribe(
      (response: { results: any[]; pagination: { currentPage: number; pageSize: number; totalItems: number; totalPages: number; }; }) => {
        this.companies = response.results;
        this.currentPage = response.pagination.currentPage;
        this.pageSize = response.pagination.pageSize;
        this.totalItems = response.pagination.totalItems;
        this.totalPages = response.pagination.totalPages;
      },
      (error: any) => {
        this.errorMessage = { summary: 'Error', detail: 'Failed to load companies.' };
        console.error('Error fetching companies:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      console.error('Form is invalid');
      this.errorMessage = { summary: 'Error', detail: 'Form is invalid.' };
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.userId) {
      // Update existing user
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.successMessage = { summary: 'Success', detail: 'User updated successfully.' };
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1000); // Navigate after showing the message for 1 second
        },
        (error: any) => {
          this.isLoading = false;
          this.errorMessage = { summary: 'Error', detail: 'Failed to update user.' };
          console.error('Error updating user:', error);
        }
      );
    } else {
      // Create new user
      this.userService.createUser(this.userForm.value).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.successMessage = { summary: 'Success', detail: 'User created successfully.' };
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1000); // Navigate after showing the message for 1 second
        },
        (error: any) => {
          this.isLoading = false;
          this.errorMessage = { summary: 'Error', detail: 'Failed to create user.' };
          console.error('Error creating user:', error);
        }
      );
    }
  }

  loadUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe(
      (response) => {
        const userData = response.result;
        this.userForm.patchValue(userData);
      },
      (error) => {
        this.errorMessage = { summary: 'Error', detail: 'Failed to load user data.' };
        console.error('Error loading user data:', error);
      }
    );
  }
}
