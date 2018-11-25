import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesService } from './employees.service';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeesSearchComponent } from './employees-search/employees-search.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
		ReactiveFormsModule
  ],
  declarations: [
		EmployeeFormComponent,
		EmployeesListComponent,
		EmployeeDetailComponent,
		EmployeesSearchComponent
	],
  providers: [
		EmployeesService
	]

})
export class EmployeesModule { }
