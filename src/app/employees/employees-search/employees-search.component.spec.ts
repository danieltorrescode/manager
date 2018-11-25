import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesSearchComponent } from './employees-search.component';

describe('EmployeesSearchComponent', () => {
  let component: EmployeesSearchComponent;
  let fixture: ComponentFixture<EmployeesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
