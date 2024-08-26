import { Component, EventEmitter, Output } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-compaies-dropdown',
  templateUrl: './compaies-dropdown.component.html',
  styleUrls: ['./compaies-dropdown.component.css']
})
export class CompaiesDropdownComponent {
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