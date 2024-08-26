import { Component, EventEmitter, Output } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.component.html',
  styleUrls: ['./add-company-modal.component.css']
})
export class AddCompanyModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  isVisible: boolean = false;
  companyName: string = '';
  userName: string = ''; 
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = ''; 

  constructor(private companyService: CompanyService) { }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.closeModalEvent.emit();
  }

  onSubmit() {
    const payload = {
      companyName: this.companyName,
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    
    this.companyService.createAccount(
      payload.companyName,
      payload.userName,
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.password
    ).subscribe(
      (      response: any) => {
        console.log('Company account created successfully:', response);
        this.closeModal();
      },
      (      error: any) => {
        console.error('Error creating company account:', error);
       
      }
    );
  }
}