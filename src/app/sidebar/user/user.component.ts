import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  companies: any[] = [];
  selectedCompanyId: string | null = null; 
  currentPage: number = 0;
  pageSize: number = 50;
  totalItems: number = 0;
  totalPages: number = 1;
  userRole: string = ''; 
  searchTerm: string = '';

 isLoading: boolean = false;
 successMessage: { summary: string, detail: string } | null = null;
 errorMessage: { summary: string, detail: string } | null = null;
  constructor(
    private companyService: CompanyService, 
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserRole();
    this.allCompanies();
  }

  getUserRole(): void {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.userRole = userInfo.roleName || ''; 
  }

  allCompanies(): void {
    this.companyService.getAllCompanies(this.currentPage, this.pageSize).subscribe(
      (response: { results: any[]; pagination: { currentPage: number; pageSize: number; totalItems: number; totalPages: number; }; }) => {
        this.companies = response.results;
        this.currentPage = response.pagination.currentPage;
        this.pageSize = response.pagination.pageSize;
        this.totalItems = response.pagination.totalItems;
        this.totalPages = response.pagination.totalPages;

        if (this.selectedCompanyId) {
          this.loadUsers();
        }
      },
      (error: any) => {
        console.error('Error ', error);
      }
    );
  }

  onCompanySelect(event: Event): void {
    const selectedCompanyId = (event.target as HTMLSelectElement).value;
    this.selectedCompanyId = selectedCompanyId;

    if (this.selectedCompanyId) {
      this.loadUsers();
    } else {
      this.users = []; 
    }
  }

  loadUsers(): void {
    if (this.selectedCompanyId) {
      this.isLoading = true; // Start loading
      this.userService.searchUsers(this.searchTerm, this.selectedCompanyId, this.pageSize, this.currentPage, 'firstName', 'asc').subscribe(
        (response) => {
          this.users = Array.isArray(response.result) ? response.result.filter(
            (user: { companyId: string | null; }) => user.companyId === this.selectedCompanyId
          ) : [];

          this.filteredUsers = this.users;

          if (response.pagination) {
            this.totalItems = response.pagination.totalItems || 0;
            this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          } else {
            this.totalItems = 0;
            this.totalPages = 1;
            console.warn('Pagination information is missing from the API response.');
          }

          this.isLoading = false; 
        },
        (error) => {
          this.isLoading = false; 
          this.errorMessage = {
            summary: 'Error loading users',
            detail: error.message || 'An unexpected error occurred.'
          };
          console.error('Error loading users:', error);
        }
      );
    } else {
      console.warn('No company ID found.');
    }
  }


  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => 
      user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  editUser(userId: string): void {
    this.router.navigate(['/create-user', userId]);
  }

  onItemsPerPageChange(event: Event): void {
    this.pageSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.currentPage = 0; 
    this.allCompanies();
  }
}

