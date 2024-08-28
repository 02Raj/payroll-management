import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SharedUiComponent } from 'src/app/shared-ui/shared-ui.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employees: any[] = [];
  companies: any[] = [];
  selectedCompanyId: string | null = null; 
  superAdminCompanyId: string | null = null;  
  currentPage: number = 0;
  pageSize: number = 30;
  totalItems: number = 0;
  totalPages: number = 1;
  roleName: any;


  isLoading: boolean = false;
  successMessage: { summary: string, detail: string } | null = null;
  errorMessage: { summary: string, detail: string } | null = null;

  constructor(
    private companyService: CompanyService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      this.roleName = parsedUserInfo.roleName;

      if (this.roleName === 'superAdmin') {
        this.superAdminCompanyId = parsedUserInfo.superAdminCompanyId || null;
      } else {
        this.selectedCompanyId = parsedUserInfo.companyId;
      }
    }

    if (this.roleName === 'companyAdmin') {
      if (this.selectedCompanyId) {
        this.fetchCompanyById(this.selectedCompanyId);
      } else {
        console.warn('No company ID found for companyAdmin.');
      }
    } else {
      this.fetchCompanies();
    }
  }
  
  fetchCompanyById(companyId: string): void {
    this.isLoading = true;
    this.companyService.getCompanyById(companyId).subscribe(
      (response) => {
        this.isLoading = false;
        const company = response.companyDetails;
      //  console.log('Fetched company object:', company);
        
        if (company.companyName) {
          this.companies = [company];
          this.selectedCompanyId = company.id; 
          localStorage.setItem('selectedCompanyId', company.id);
          localStorage.setItem('selectedCompanyName', company.companyName);
         // console.log('Company name:', company.companyName); 
        } else {
          this.errorMessage = { summary: 'Error', detail: 'Company name is not defined.' };
        }

        this.loadEmployees();
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error :', error);
        this.errorMessage = { summary: 'Error', detail: 'Failed to fetch company details.' };
      }
    );
  }

  fetchCompanies(): void {
    this.isLoading = true;
    this.companyService.getAllCompanies(this.currentPage, this.pageSize).subscribe(
      (response: { results: any[]; pagination: { currentPage: number; pageSize: number; totalItems: number; totalPages: number; }; }) => {
        this.isLoading = false;
        this.companies = response.results;
        this.currentPage = response.pagination.currentPage;
        this.pageSize = response.pagination.pageSize;
        this.totalItems = response.pagination.totalItems;
        this.totalPages = response.pagination.totalPages;

        const companyIdToUse = this.superAdminCompanyId || this.selectedCompanyId;

        if (companyIdToUse) {
          this.onCompanySelectById(companyIdToUse);
        } else {
          console.warn('No company ID available to load employees.');
        }
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error ', error);
        this.errorMessage = { summary: 'Error', detail: 'Failed to fetch companies.' };
      }
    );
  }

  onCompanySelect(event: Event): void {
    const selectedCompanyId = (event.target as HTMLSelectElement).value;
    this.superAdminCompanyId = selectedCompanyId;  
    this.onCompanySelectById(selectedCompanyId);
  }

  onCompanySelectById(selectedCompanyId: string): void {
    this.isLoading = true;
    const selectedCompany = this.companies.find(company => company.companyId === selectedCompanyId);

    if (selectedCompany) {
      localStorage.setItem('selectedCompanyId', selectedCompany.companyId);
      localStorage.setItem('selectedCompanyName', selectedCompany.companyName);
      console.log(' company saved  localStorageeee:'
        , 
        {
        companyId: selectedCompany.companyId,
        companyName: selectedCompany.companyName
      });
      this.selectedCompanyId = selectedCompany.companyId; 
      this.loadEmployees();
    } else {
      this.isLoading = false;
      this.errorMessage = { summary: 'Error', detail: 'Company not found.' };
    }
  }

  loadEmployees(): void {
    const companyIdToUse = this.superAdminCompanyId || this.selectedCompanyId;

    if (companyIdToUse) {
     // console.log('Loading employees for companyId:', companyIdToUse);
      this.isLoading = true;

      this.employeeService.getEmployeesByCompanyId(companyIdToUse).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.employees = response.results;
          this.currentPage = response.pagination.currentPage;
          this.pageSize = response.pagination.pageSize;
          this.totalItems = response.pagination.totalItems;
          this.totalPages = response.pagination.totalPages;
          console.log('Employees loaded:', this.employees);
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Error ', error);
          this.errorMessage = { summary: 'Error', detail: 'Failed to load employees.' };
        }
      );
    } else {
      console.warn('No company ID found in local storage.');
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEmployees();  
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEmployees(); 
    }
  }

  updateEmployee(employeeId: string): void {
    const companyIdToUse = this.superAdminCompanyId || this.selectedCompanyId;

    if (companyIdToUse) {
     // console.log('Navigating with employeeId:', employeeId, 'and companyId:', companyIdToUse);
      this.router.navigate(['/create-employee'], {
        queryParams: {
          id: employeeId,
          companyId: companyIdToUse
        }
      });
    } else {
      console.error('No company ID found for updating employee');
    }
  }


  onPageSizeChange(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.loadEmployees();
  }

}