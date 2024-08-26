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





  constructor(private sideNavService: SidenavService) {
   
  }

  // toggleSidebar() {
  //   this.sideNavService.toggle();
  // }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}