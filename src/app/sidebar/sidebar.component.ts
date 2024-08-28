import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  dropdownVisible: boolean = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  companyName: string = '';  
  isSuperAdmin: boolean = false;

  showCompanyProfile: boolean = true;
  showCompany: boolean = true;

  dropdownVisibleEmployees: boolean = false;
  dropdownVisibleCompany: boolean = false;
  dropdownVisibleUsers: boolean = false;
  dropdownVisiblePayroll: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      this.firstName = userInfo.firstName;
      this.lastName = userInfo.lastName;
      this.email = userInfo.email;
      this.username = userInfo.userName;
      this.companyName = userInfo.companyName;

      this.isSuperAdmin = userInfo.roleName === 'superAdmin';


      if (userInfo.roleName === 'superAdmin') {
        this.showCompanyProfile = false; 
      }
      if (userInfo.roleName === 'companyAdmin') {
        this.showCompany = false; 
      }
    }
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('#user-menu') || target.closest('#dropdown-user');

    if (!clickedInside) {
      this.dropdownVisible = false;
    }
  }

  navigateToProfile(): void {
    this.dropdownVisible = false;
    this.router.navigate(['/user-profile']);
  }

  navigateToChangePassword(){
    this.dropdownVisible = false; 
    this.router.navigate(['/change-password']);  
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('selectedCompanyId');
    localStorage.removeItem('selectedCompanyName');

    this.router.navigate(['/login']);
  }

  closeCallback(event: Event) {
    this.sidebarVisible = false;
  }

  togglePayrollDropdown() {
    this.dropdownVisiblePayroll = !this.dropdownVisiblePayroll;
  }

  toggleEmployeesDropdown(): void {
    this.dropdownVisibleEmployees = !this.dropdownVisibleEmployees;
  }

  toggleCompanyDropdown(): void {
    this.dropdownVisibleCompany = !this.dropdownVisibleCompany;
  }

  toggleUsersDropdown(): void {
    this.dropdownVisibleUsers = !this.dropdownVisibleUsers;
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
    console.log('Sidebar toggled:', this.sidebarVisible);
  }
  
  
}

