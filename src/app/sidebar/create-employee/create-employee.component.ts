import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SharedUiComponent } from 'src/app/shared-ui/shared-ui.component';

import { EmploymentType } from 'src/enum/employment-type.enum';
import { PayFrequency } from 'src/enum/pay-frequency.enum';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup;
  companies: any[] = [];
  employmentTypes = Object.values(EmploymentType);
  payFrequencies = Object.values(PayFrequency);
  employeeId: string | null = null;
  roleName: any;
  selectedCompanyId: any;

  // UI State
  isLoading: boolean = false;
  successMessage: { summary: string, detail: string } | null = null;
  errorMessage: { summary: string, detail: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router, 
  ) {
    this.employeeForm = this.fb.group({
      companyId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilePhone: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      ssNumber: [''],
      employmentType: [''],
      occupation: [''],
      payFrequency: [''],
      yearlySalary: [null],
      regularRate: [null],
      otRate: [null],
      sickRate: [null],
      vacationRate: [null],
      hireDate: [''],
      birthDate: [''],
      w4Part2MultipleJobs: [false],
      filingStatusFed: [''],
      filingStatusState: [''],
      claimDependent: [null],
      otherIncome: [null],
      deductions: [null],
      extraWithholdings: [null],
      socialSecurityRate: [null],
      medicareRate: [null],
      active: [false],
      k401: [false],
      sdi: [false],
      healthInsurance: [false],
      eic: [false],
      gender: [''],
      grade: ['']
    });
  }

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.employeeId = this.route.snapshot.queryParamMap.get('id');
    
    const companyIdFromUrl = this.route.snapshot.queryParamMap.get('companyId') || undefined;

    this.isLoading = true;

    if (userInfo.roleName === 'companyAdmin' && userInfo.companyId) {
      this.roleName = userInfo.roleName;
      this.selectedCompanyId = userInfo.companyId;
      this.fetchCompanies(userInfo.companyId);
    } else {
      this.fetchCompanies(companyIdFromUrl);
    }

    if (this.employeeId) {
      this.loadEmployeeData(this.employeeId);
    }
  }

  fetchCompanies(companyIdToSelect?: string): void {
    this.companyService.getAllCompanies(0, 10).subscribe(
      (response: { results: any[] }) => {
        if (companyIdToSelect) {
          const selectedCompany = response.results.find(company => company.companyId === companyIdToSelect);
          if (selectedCompany) {
            this.companies = [selectedCompany]; // Show only the selected company
            this.employeeForm.patchValue({ companyId: selectedCompany.companyId });
          }
        } else {
          this.companies = response.results;
        }
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        this.errorMessage = { summary: '', detail: 'Failed to fetch companies.' };
        console.error('Error fetching companies:', error);
      }
    );
  }

  loadEmployeeData(employeeId: string): void {
    this.isLoading = true;
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (response) => {
        const employeeData = response.result;
        this.employeeForm.patchValue(employeeData);
        this.fetchCompanies(employeeData.companyId);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = { summary: 'Error', detail: 'Failed to load employee data.' };
        console.error('Error loading employee data:', error);
      }
    );
  }

  saveEmployee(): void {
    if (this.employeeForm.valid) {
      this.isLoading = true;
      if (this.employeeId) {
        this.updateEmployee();
      } else {
        this.createEmployee();
      }
    } else {
      this.errorMessage = { summary: '', detail: 'Form is not valid. Please check the inputs.' };
      console.error('Form is not valid');
    }
  }

  createEmployee(): void {
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(
      response => {
        this.isLoading = false;
        this.successMessage = { summary: '', detail: 'Employee created successfully.' };
        console.log('Employee created successfully:', response);
        
        // Navigate to the company page after a short delay
        setTimeout(() => {
          this.router.navigate(['/employee']);  // Replace '/companies' with your desired route
        }, 2000); // Delay of 2 seconds before navigation
      },
      error => {
        this.isLoading = false;
        this.errorMessage = { summary: 'Error', detail: 'Failed to create employee.' };
        console.error('Error creating employee:', error);
      }
    );
  }

  updateEmployee(): void {
    if (this.employeeId) {
      this.isLoading = true;  // Show loading indicator
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe(
        response => {
          this.isLoading = false;  // Hide loading indicator
          this.successMessage = { summary: '', detail: 'Employee updated successfully.' };
          console.log('Employee updated successfully:', response);
  
          // Navigate to the company page after a short delay
          setTimeout(() => {
            this.router.navigate(['/employee']);  // Replace '/companies' with your desired route
          }, 2000); // Delay of 2 seconds before navigation
        },
        error => {
          this.isLoading = false;  // Hide loading indicator
          this.errorMessage = { summary: 'Error', detail: 'Failed to update employee.' };
          console.error('Error updating employee:', error);
        }
      );
    }
  }
  

  onCompanySelect(event: Event): void {
    const selectedCompanyId = (event.target as HTMLSelectElement).value;
    const selectedCompany = this.companies.find(company => company.companyId === selectedCompanyId);
    if (selectedCompany) {
      this.employeeForm.patchValue({ companyId: selectedCompany.companyId });
    }
  }
}