import { Component } from '@angular/core';

@Component({
  selector: 'app-company-dropdown',
  templateUrl: './company-dropdown.component.html',
  styleUrls: ['./company-dropdown.component.css']
})
export class CompanyDropdownComponent {
  private readonly companyIdKey = 'selectedCompanyId';
  private readonly companyNameKey = 'selectedCompanyName';

  constructor() {}

  saveCompanySelection(companyId: string, companyName: string): void {
    localStorage.setItem(this.companyIdKey, companyId);
    localStorage.setItem(this.companyNameKey, companyName);
  }

  getSelectedCompanyId(): string | null {
    return localStorage.getItem(this.companyIdKey);
  }

  getSelectedCompanyName(): string | null {
    return localStorage.getItem(this.companyNameKey);
  }

  clearCompanySelection(): void {
    localStorage.removeItem(this.companyIdKey);
    localStorage.removeItem(this.companyNameKey);
  }

}
