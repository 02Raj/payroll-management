import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  selectedDate: any;
  selectedPayDate: any;

  ranges: any = {
    'Today': [new Date(), new Date()],
    'Yesterday': [new Date().setDate(new Date().getDate() - 1), new Date().setDate(new Date().getDate() - 1)],
    'Last 7 Days': [new Date().setDate(new Date().getDate() - 6), new Date()],
    'Last 30 Days': [new Date().setDate(new Date().getDate() - 29), new Date()],
    'This Month': [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
    'Last Month': [new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0)]
  };

  constructor() { }
}
