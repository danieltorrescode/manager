import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService , Employee} from '../employees.service';

@Component({
  selector: 'app-employees-search',
  templateUrl: './employees-search.component.html',
  styleUrls: ['./employees-search.component.css']
})
export class EmployeesSearchComponent implements OnInit {

	employees:Employee[] =[];

	term:string;
  constructor(private activatedRoute:ActivatedRoute,
							private _employeesService:EmployeesService) {

	}

  ngOnInit() {
		// this.activatedRoute.params.subscribe(params =>{
		// 	// console.log(params['term']);
		// 	// this.employee = this._employeesService.getEmployee(params['id']);
		// 	this.employees = this._employeesService.searchEmployee(params['term']);
		// 	this.term = params['term'];
		// 	// console.log(this.employees);
		// });

	}

}
