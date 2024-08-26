import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaiesDropdownComponent } from './compaies-dropdown.component';

describe('CompaiesDropdownComponent', () => {
  let component: CompaiesDropdownComponent;
  let fixture: ComponentFixture<CompaiesDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompaiesDropdownComponent]
    });
    fixture = TestBed.createComponent(CompaiesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
