import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeesSearchComponent } from './employees-search/employees-search.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

import { AuthGuard } from '../auth/auth.guard';

const EMPLOYEES_ROUTES: Routes = [
	{ path: '', component: EmployeesListComponent, canActivate: [AuthGuard] },
	{ path: 'detail/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
	{ path: 'search/:term', component: EmployeesSearchComponent, canActivate: [AuthGuard] },
	{ path: 'form', component: EmployeeFormComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(EMPLOYEES_ROUTES)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
