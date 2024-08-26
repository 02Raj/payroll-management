import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createUser(userData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    companyId: string;
    role: string;
    email: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/createUser`, userData);
  }
  

  searchUsers(keyword: string, companyId: string, pageSize: number, currentPage: number, sortBy: string, orderBy: string): Observable<any> {
    const searchPayload = {
      keyword: keyword,
      companyId: companyId,
      pageSize: pageSize,
      currentPage: currentPage,
      sortBy: sortBy,
      orderBy: orderBy,
    };

    return this.http.post<any>(`${this.apiUrl}/user/searchUsers`, searchPayload);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<any>(url);  // Using GET to retrieve the user data
  }
  
  
  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.apiUrl}/user/update/${userId}`;
    return this.http.put(url, userData);
  }

}
