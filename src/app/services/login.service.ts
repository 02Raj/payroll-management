import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  
    login(userName: string, password: string): Observable<any> {
      const loginPayload = {
        userName: userName,
        password: password
      };
      return this.http.post<any>(`${this.apiUrl}/user/login`, loginPayload);
    }
  
    changePassword(payload: { userId: string, currentPassword: string, newPassword: string }): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/user/changePassword`, payload);
    }
  
    saveToken(token: string, refreshToken: string): void {
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  
    getToken(): string | null {
      return localStorage.getItem('authToken');
    }
  
    getRefreshToken(): string | null {
      return localStorage.getItem('refreshToken');
    }
  
    isLoggedIn(): boolean {
      return !!this.getToken();
    }
  
    logout(): void {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  
    refreshToken(): Observable<any> {
      const refreshToken = localStorage.getItem('refreshToken'); 
      return this.http.post<any>(`${this.apiUrl}/user/refresh-token`, { refreshToken });
    }
  }
