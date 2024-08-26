import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayrollComponent } from './create-payroll.component';

describe('CreatePayrollComponent', () => {
  let component: CreatePayrollComponent;
  let fixture: ComponentFixture<CreatePayrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePayrollComponent]
    });
    fixture = TestBed.createComponent(CreatePayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
