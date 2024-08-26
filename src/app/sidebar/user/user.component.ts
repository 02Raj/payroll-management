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
  companies: any[] = [];
  selectedCompanyId: string | null = null; 
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 1;
  userRole: string = '';  // To store the role of the user

  constructor(
    private companyService: CompanyService, 
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserRole();
    this.fetchCompanies();
  }

  getUserRole(): void {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.userRole = userInfo.roleName || '';  // Assuming 'roleName' is the key
  }

  fetchCompanies(): void {
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
        console.error('Error fetching companies:', error);
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
      this.userService.searchUsers('', this.selectedCompanyId, this.pageSize, this.currentPage, 'firstName', 'asc').subscribe(
        (response: any) => {
          console.log('API Response:', response);
  
        
          this.users = Array.isArray(response.result) ? response.result.filter(
            (user: { companyId: string | null; }) => user.companyId === this.selectedCompanyId
          ) : [];
  
          
          if (response.pagination) {
            this.totalItems = response.pagination.totalItems || 0;
            this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          } else {
            this.totalItems = 0;
            this.totalPages = 1;
            console.warn('Pagination information is missing from the API response.');
          }
  
          console.log('Users loaded:', this.users);
        },
        (error: any) => {
          console.error('Error loading users:', error);
        }
      );
    } else {
      console.warn('No company ID found.');
    }
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
}
