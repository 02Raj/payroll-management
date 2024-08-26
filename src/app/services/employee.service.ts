import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createEmployee(employeeData: any): Observable<any> {
    const url = `${this.apiUrl}/employee/create`;
    return this.http.post(url, employeeData);
  }
  getEmployeesByCompanyId(companyId: string): Observable<any> {
    const url = `${this.apiUrl}/employee/getAllByCompanyId/${companyId}`;
    return this.http.get(url);
  }

  getEmployeeById(employeeId: string): Observable<any> {
    const url = `${this.apiUrl}/employee/get/${employeeId}`;
    return this.http.get(url);
  }

  updateEmployee(employeeId: string, employeeData: any): Observable<any> {
    const url = `${this.apiUrl}/employee/update/${employeeId}`;
    return this.http.put(url, employeeData);
  }

}


