import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentsService ,Department } from '../departments.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})

export class DepartmentsListComponent implements OnInit {
	departments:Department[]=[];
	departmentsSaveCopy:Department[]=[];
	formPanel:boolean=false;
	firstPanelLength:boolean=true;
	selectedDepartment:any;
  constructor(private router:Router,
							private departmentsService:DepartmentsService) {

	}

	ngOnInit() {
			// console.log("OnInit");
			this.getDepartments();
  }

	getDepartments(){
		this.departmentsService.getDepartments().subscribe(
			(data: any ) => {
				console.log(data.body);
				this.departments = data.body;
			}, // success path
			error => console.error(error) // error path
		);

	}

	DepartmentDelete(department:Department){
		if(confirm(`Do you want delete the employee: ${department.name}`)){
			this.departmentsService.deleteDepartment(department._id).subscribe(
				resp => {
							// display its headers
							const keys = resp.headers.keys();
							 let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
							// access the body directly, which is typed as `Config`.
							 let data = { ... resp.body };

							 // console.log('delete');
							 // console.log(headers);
							 // console.log(data);
					 		// let index = this.departments.map(e => e._id).indexOf(department._id);
					 		// this.departments.splice(index,1);
							this.departments = this.departments.filter(d => d._id !== department._id);

						}
			);

		}else{
			console.log('do not delete');
		}
	}

	showFormPanel(){
		this.formPanel = !this.formPanel
		this.firstPanelLength = !this.firstPanelLength;
	}
	closeFormPanel(){
		this.formPanel = false
		this.firstPanelLength = true;
		this.selectedDepartment = null;
	}
	selectDeparment(department:Department){
		if(!this.selectedDepartment){
			this.showFormPanel();
		}
		this.selectedDepartment = department;
		this.departmentsSaveCopy = this.departments;
	}
	addDeparment(){
		this.showFormPanel();
		this.selectedDepartment = {};
		this.departmentsSaveCopy = this.departments;
	}
	replicateChanges(department:any){
		if(department){
			this.getDepartments();
		}
	}

}
