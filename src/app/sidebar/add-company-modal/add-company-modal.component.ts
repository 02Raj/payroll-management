import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.component.html',
  styleUrls: ['./add-company-modal.component.css']
})
export class AddCompanyModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  isVisible: boolean = false;

  companyForm: FormGroup;
  isLoading: boolean = false;
  successMessage: { summary: string, detail: string } | null = null;
  errorMessage: { summary: string, detail: string } | null = null;

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    // Initialize the form group with controls
    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      userName: [{ value: '', disabled: false }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.closeModalEvent.emit();
  }

  onSubmit() {
    if (this.companyForm.invalid) {
      return;
    }

    // Reset messages and start loading
    this.successMessage = null;
    this.errorMessage = null;
    this.isLoading = true;

    const payload = this.companyForm.getRawValue();

    // Make the API call to create a company account
    this.companyService.createAccount(
      payload.companyName,
      payload.userName,
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.password
    ).subscribe(
      response => {
        console.log('Company account created successfully:', response);
        this.successMessage = { summary: 'Success', detail: 'Company created successfully.'  };
        this.isLoading = false;
        this.closeModal();  // Close modal after success
      },
      error => {
        console.error('Error creating company account:', error);
        this.errorMessage = { summary: 'Error', detail: 'Failed to create company. Please try again.' };
        this.isLoading = false;
      }
    );
  }
}