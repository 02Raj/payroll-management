import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-create-payroll',
  templateUrl: './create-payroll.component.html',
  styleUrls: ['./create-payroll.component.css']
})
export class CreatePayrollComponent {
  selectedDate: any;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  constructor() {
    this.selectedDate = {
      startDate: moment().startOf('day'),
      endDate: moment().endOf('day')
    };
  }
}
