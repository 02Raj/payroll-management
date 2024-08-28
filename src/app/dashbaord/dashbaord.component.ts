import { Component } from '@angular/core';
import { SidenavService } from '../sidebar/sidenav.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent {
  sidebarVisible: boolean | undefined;
  isDropdownOpen = false;
  roleName: string | null = null;

  constructor(private sideNavService: SidenavService) {
   
    const userInfo = localStorage.getItem('userInfo');
    
    if (userInfo) {
      const user = JSON.parse(userInfo);
      this.roleName = user.roleName;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

}