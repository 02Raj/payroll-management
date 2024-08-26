import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCompilanceComponent } from './hr-compilance.component';

describe('HrCompilanceComponent', () => {
  let component: HrCompilanceComponent;
  let fixture: ComponentFixture<HrCompilanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrCompilanceComponent]
    });
    fixture = TestBed.createComponent(HrCompilanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
