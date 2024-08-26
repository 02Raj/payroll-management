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

const routes: Routes = [
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'payroll', component: PayrollComponent },
  { path: 'create-payroll', component: CreatePayrollComponent },
  { path: 'report', component: ReportComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'create-employee', component: CreateEmployeeComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'user', component: UserComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'create-user/:userId', component: CreateUserComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'edit-company/:id', component: EditCompanyComponent },
  { path: 'edit-company', component: EditCompanyComponent },
  { path: 'hr-compliance', component: HrCompilanceComponent },
  { path: 'login', component: LoginComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
