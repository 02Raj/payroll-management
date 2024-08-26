import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userId: string = '';
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  email: string = '';
  roleName: string = '';
  companyName: string = '';

  constructor() { }

  ngOnInit(): void {
    
    const userInfoString = localStorage.getItem('userInfo');

    if (userInfoString) {
    
      const userInfo = JSON.parse(userInfoString);


      this.userId = userInfo.userId;
      this.firstName = userInfo.firstName;
      this.lastName = userInfo.lastName;
      this.userName = userInfo.userName;
      this.email = userInfo.email;
      this.roleName = userInfo.roleName;
      this.companyName = userInfo.companyName;
    }
  }
}
