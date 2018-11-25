import { Component, OnInit } from '@angular/core';
import { EmployeesService ,Employee } from '../employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

	employees:Employee[]=[];
  constructor( private _employeesService:EmployeesService,
								private router:Router) {
		// console.log("employees.component");
	}

  ngOnInit() {
			// console.log("OnInit");
			this.getEmployees();
  }

	getEmployees(){
		this._employeesService.getEmployees().subscribe(
			resp => {
						// display its headers
						const keys = resp.headers.keys();
						 let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
						// access the body directly, which is typed as `Config`.
						 // let data = { ... resp.body };
						 // console.log(headers);
						 // console.log(data);
						this.employees = resp.body;
					}, // success path
			error => console.error(error) // error path
		);
	}

	seeEmployeeDetails(id:number){
		// console.log("Details");
		this.router.navigate( ['employees/detail',id])
	}

	EmployeeDelete(employee:Employee){
		if(confirm(`Do you want delete the employee: ${employee.firstName} ${employee.lastName}`)){
			this._employeesService.deleteEmployee(employee._id).subscribe(
				resp => {
							// display its headers
							const keys = resp.headers.keys();
							 let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
							// access the body directly, which is typed as `Config`.
							 let data = { ... resp.body };

							 // console.log('delete');
							 // console.log(headers);
							 // console.log(data);
					 		let index = this.employees.map(e => e._id).indexOf(employee._id);
					 		this.employees.splice(index,1);
						}
			);

		}else{
			console.log('do not delete');
		}
	}

	EmployeeUpdate(employee:Employee){
		localStorage.setItem("employee", JSON.stringify(employee) );
		this.router.navigate( ['employees/form']);
	}

}
