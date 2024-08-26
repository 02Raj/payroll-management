import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { PayrollComponent } from './sidebar/payroll/payroll.component';
import { CreatePayrollComponent } from './sidebar/create-payroll/create-payroll.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReportComponent } from './sidebar/report/report.component';
import { EmployeeComponent } from './sidebar/employee/employee.component';
import { CreateEmployeeComponent } from './sidebar/create-employee/create-employee.component';
import { CompanyComponent } from './sidebar/company/company.component';
import { AddCompanyModalComponent } from './sidebar/add-company-modal/add-company-modal.component';
import { UserComponent } from './sidebar/user/user.component';
import { CreateUserComponent } from './sidebar/create-user/create-user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthInterceptor } from './auth.interceptor';
import { CompanyDropdownComponent } from './components/company-dropdown/company-dropdown.component';
import { CompaiesDropdownComponent } from './compaies-dropdown/compaies-dropdown.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedUiComponent } from './shared-ui/shared-ui.component';
import { MessageService } from 'primeng/api';
import { HrCompilanceComponent } from './hr-compilance/hr-compilance.component';

//import { FloatLabelModule } from 'primeng/floatlabel';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashbaordComponent,
    SidebarComponent,
    PayrollComponent,
    CreatePayrollComponent,
    ReportComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    CompanyComponent,
    AddCompanyModalComponent,
    UserComponent,
    CreateUserComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    CompanyDropdownComponent,
    CompaiesDropdownComponent,
    CreateCompanyComponent,
    EditCompanyComponent,
    SharedUiComponent,
    HrCompilanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    SidebarModule,
    StyleClassModule,
    RippleModule,
    HttpClientModule ,
    ReactiveFormsModule,
    ToastModule,
    ProgressSpinnerModule,
   // FontAwesomeModule,
    NgxDaterangepickerMd.forRoot()
    //FloatLabelModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
