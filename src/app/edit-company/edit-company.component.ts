import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent {
// UI State
isLoading: boolean = false;
successMessage: { summary: string, detail: string } | null = null;
errorMessage: { summary: string, detail: string } | null = null;

companyForm: FormGroup;
companyId: string | null = null;

constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private companyService: CompanyService
) {
  // Initialize the form with the required fields
  this.companyForm = this.fb.group({
    companyName: ['', Validators.required],
    address1: [''],
    address2: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    email: ['', [Validators.required, Validators.email]],
    website: [''],
    owner: [''],
    routingNumber: [''],
    accountNumber: [''],
    fedEINNumber: [''],
    stateEINNumber: [''],
    fedUnEmpRate: [0],
    stateUnEmpRate: [0],
    active: [false],
    frequency: [0],
    type: [''],
    business: [''],
    fax: [''],
    contact: ['']
  });
}
  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const storedRoleName = user.roleName;
    const storedCompanyId = user.companyId;

   
    this.companyId = this.route.snapshot.paramMap.get('id');


    if (this.companyId) {
     
        this.loadCompanyData(this.companyId as string); 
    } else if (storedRoleName === 'companyAdmin' && storedCompanyId) {
        // Scenario 1: URL does not contain a companyId, use companyId from local storage
        this.companyId = storedCompanyId;
        this.loadCompanyData(this.companyId as string);  // Using companyId from local storage
    } else {
        console.error('Company ID is not available from URL or local storage');
        // Optionally, redirect the user or show an error message
        this.router.navigate(['/company']);  // Redirect to a different page
    }
}



loadCompanyData(companyId: string): void {
  this.companyService.getCompanyById(companyId).subscribe(
    (response: { message: string; companyDetails: any }) => {
      this.isLoading = false; // Hide spinner after data is loaded
      const company = response.companyDetails;

      if (company) {
        this.companyForm.patchValue({
          companyName: company.companyName,
          address1: company.address?.address1,
          address2: company.address?.address2,
          city: company.address?.city,
          state: company.address?.state,
          zipCode: company.address?.zipCode,
          email: company.email,
          website: company.website,
          owner: company.owner,
          routingNumber: company.bankAccount?.routingNumber,
          accountNumber: company.bankAccount?.accountNumber,
          fedEINNumber: company.taxes?.einFed,
          stateEINNumber: company.taxes?.eiNstate,
          fedUnEmpRate: company.taxes?.fedUnEmpRate,
          stateUnEmpRate: company.taxes?.stateUnEmpRate,
          active: company.otherDetails?.someFlag,
          frequency: company.otherDetails?.frequency,
          type: company.otherDetails?.companyType,
          business: company.otherDetails?.businessType,
          fax: company.otherDetails?.fax,
          contact: company.otherDetails?.contact,
        });
      }
    },
    (error) => {
      this.isLoading = false; 
      this.errorMessage = { summary: 'Error', detail: 'Error fetching company data. Please try again.' };
      console.error('Error fetching company data:', error);
    }
  );
}
saveCompany(): void {
  if (this.companyForm.valid && this.companyId) {
    this.isLoading = true;  // Show loading spinner
    this.companyService.updateCompany(this.companyId, this.companyForm.value).subscribe(
      (response: any) => {
        console.log("msg", response.message);
        this.successMessage = { summary: 'Success', detail: response.message || 'Company updated successfully.' };

        // Stop the loading spinner
        this.isLoading = false;

        // Delay navigation to allow the success message to be displayed
        setTimeout(() => {
          // Handle navigation based on user role
          const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
          const storedRoleName = user.roleName;

          if (storedRoleName === 'companyAdmin') {
            this.router.navigate(['/dashboard']);
          } else if (storedRoleName === 'superAdmin') {
            this.router.navigate(['/company']);
          } else {
            this.router.navigate(['/login']);
          }
        }, 3000);  // Delay for 3 seconds to match the toast message duration
      },
      (error: any) => {
        this.isLoading = false;
        this.errorMessage = { summary: 'Error', detail: 'Error updating company.', };
        console.error('Error updating company:', error);
      }
    );
  } else {
    this.errorMessage = { summary: 'Error', detail: 'Invalid company data.', };
    console.error('Invalid company ID');
  }
}


cancelUpdate(): void {
  this.router.navigate(['/company']); 
}

clearMessages(): void {
  this.successMessage = null;
  this.errorMessage = null;
}
}