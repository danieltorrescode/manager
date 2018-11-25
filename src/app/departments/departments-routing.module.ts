import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import {DepartmentsListComponent} from './departments-list/departments-list.component';
import {DepartmentDetailComponent} from './department-detail/department-detail.component';
import {DepartmentFormComponent} from './department-form/department-form.component';

const DEPARTMENTS_ROUTES: Routes = [
	{path: '',component: DepartmentsListComponent , canActivate: [AuthGuard]},
	{ path: 'detail/:id', component: DepartmentDetailComponent , canActivate: [AuthGuard]},
	{ path: 'form', component: DepartmentFormComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(DEPARTMENTS_ROUTES)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
