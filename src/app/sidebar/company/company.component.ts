import { Component, ViewChild } from '@angular/core';
import { AddCompanyModalComponent } from '../add-company-modal/add-company-modal.component';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  @ViewChild('addCompanyModal') addCompanyModal!: AddCompanyModalComponent;
  companies: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 1;

   // UI State
   isLoading: boolean = false;
   successMessage: { summary: string, detail: string } | null = null;
   errorMessage: { summary: string, detail: string } | null = null;
  constructor(private companyService: CompanyService, private router: ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.fetchCompanies();
  }

  ngAfterViewInit(): void {
  
    if (!this.addCompanyModal) {
      console.error('The modal component is not initialized.');
    }
  }



  fetchCompanies(): void {
    this.isLoading = true; 
    this.companyService.getAllCompanies(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.isLoading = false; 
        this.companies = response.results;
        this.currentPage = response.pagination.currentPage;
        this.pageSize = response.pagination.pageSize;
        this.totalItems = response.pagination.totalItems;
        this.totalPages = response.pagination.totalPages;
        console.log("this.companies", this.companies);

        if (this.companies.length === 0) {
          this.successMessage = { summary: 'No Records', detail: 'No companies found.' };
        }
      },
      (error) => {
        this.isLoading = false; 
        this.errorMessage = { summary: 'Error', detail: 'Error fetching companies. Please try again.' };
        console.error('Error fetching companies:', error);
      }
    );
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchCompanies();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchCompanies();
    }
  }

  openAddCompanyModal() {
    if (this.addCompanyModal) {
      this.addCompanyModal.openModal();
    } else {
      console.error('addCompanyModal is not initialized');
    }
  }

  closeAddCompanyModal() {
    if (this.addCompanyModal) {
      this.addCompanyModal.closeModal();
    } else {
      console.error('addCompanyModal is not initialized');
    }
  }

  updateCompany(companyId: string): void {
    this.route.navigate(['/edit-company', companyId]);
  }
  onPageSizeChange(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0; // Reset to the first page
    this.fetchCompanies(); // Re-fetch companies with the new page size
  }
}
