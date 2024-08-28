import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PayrollComponent } from './sidebar/payroll/payroll.component';
import { CreatePayrollComponent } from './sidebar/create-payroll/create-payroll.component';
import { ReportComponent } from './sidebar/report/report.component';
import { EmployeeComponent } from './sidebar/employee/employee.component';
import { CreateEmployeeComponent } from './sidebar/create-employee/create-employee.component';
import { CompanyComponent } from './sidebar/company/company.component';
import { UserComponent } from './sidebar/user/user.component';
import { CreateUserComponent } from './sidebar/create-user/create-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { HrCompilanceComponent } from './hr-compilance/hr-compilance.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashbaordComponent, canActivate: [authGuard] },
  { path: 'sidebar', component: SidebarComponent, canActivate: [authGuard] },
  { path: 'payroll', component: PayrollComponent, canActivate: [authGuard] },
  { path: 'create-payroll', component: CreatePayrollComponent, canActivate: [authGuard] },
  { path: 'report', component: ReportComponent, canActivate: [authGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [authGuard] },
  { path: 'create-employee', component: CreateEmployeeComponent, canActivate: [authGuard] },
  { path: 'company', component: CompanyComponent, canActivate: [authGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [authGuard] },
  { path: 'create-user/:userId', component: CreateUserComponent, canActivate: [authGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
  { path: 'edit-company/:id', component: EditCompanyComponent, canActivate: [authGuard] },
  { path: 'edit-company', component: EditCompanyComponent, canActivate: [authGuard] },
  { path: 'hr-compliance', component: HrCompilanceComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
