import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService ,Employee } from '../employees.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

	employee:any={};
  constructor(private activatedRoute:ActivatedRoute,
							private _employeesService:EmployeesService) {
	}

  ngOnInit() {
		this.activatedRoute.params.subscribe(params =>{
			// console.log(params['id']);
			this._employeesService.getOneEmployee(params['id']).subscribe(
				resp => {
							// display its headers
							const keys = resp.headers.keys();
							 let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
							// access the body directly, which is typed as `Config`.
							 let data = { ... resp.body };

							 // console.log('getOnePost');
							 // console.log(headers);
							 this.employee = data;
						}
			);
		});
  }

}
