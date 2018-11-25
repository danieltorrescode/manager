import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentsListComponent } from './departments-list/departments-list.component';

import { DepartmentsService } from './departments.service';

@NgModule({
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
		ReactiveFormsModule
  ],
  declarations: [
		DepartmentDetailComponent,
		DepartmentFormComponent,
		DepartmentsListComponent
	],
	providers:[
		DepartmentsService
	]
})
export class DepartmentsModule { }
