import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createAccount(companyName: string, username: string, firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const createAccountPayload = {
      companyName: companyName,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}/company/createAccount`, createAccountPayload);
  }
  getAllCompanies(currentPage: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
        .set('page', currentPage.toString())
        .set('size', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/company/get/all`, { params });
}


  getCompanyById(companyId: string): Observable<any> {
    const url = `${this.apiUrl}/company/get/${companyId}`;
    return this.http.get(url);
  }


  updateCompany(companyId: string, companyData: any): Observable<any> {
    const url = `${this.apiUrl}/company/update/${companyId}`;
    return this.http.put(url, companyData);
  }


}
