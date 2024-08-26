import { Component } from '@angular/core';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent {
  selectedCompany: string = '';
  isCompanySelected: boolean = false;



  onCompanyChange() {
    this.isCompanySelected = this.selectedCompany === 'neeraj-company';
  }
}
