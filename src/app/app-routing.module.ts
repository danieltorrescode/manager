import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { AboutComponent } from './components/about/about.component';

import { AuthGuard } from './auth/auth.guard';

const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{
		path: 'employees',
		loadChildren: './employees/employees.module#EmployeesModule',
		canLoad: [AuthGuard]
	},
	{
	  path: 'departments',
	  loadChildren: './departments/departments.module#DepartmentsModule',
		canLoad: [AuthGuard]
	},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
