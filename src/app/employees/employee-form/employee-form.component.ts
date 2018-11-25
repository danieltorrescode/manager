import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
	FormGroup, FormControl, Validators,
	FormArray,FormBuilder } from '@angular/forms';
import { EmployeesService ,Employee } from '../employees.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {

	departments : Object;
	employeeForm : FormGroup;
	oldDataEmployee:any;

	showMsg :boolean = false;
  constructor(private router:Router,private fb: FormBuilder,
							private _employeesService:EmployeesService) {
		this.employeeForm = this.fb.group({
			firstName: [''],
			lastName: [''],
			email: [''],
			department: [''],
			job: [''],
			salary: [''],
			img: ['']
		});

		this.departments = [
			{id:1,name:'I.T'},
			{id:2,name:'Marketing'},
			{id:3,name:'accounting'},
			{id:4,name:'finances'}
		];

		this.employeeForm.controls.firstName.setValidators([
			Validators.required,
			Validators.minLength(2)
		]);

		this.employeeForm.controls.lastName.setValidators([
			Validators.required,
			Validators.minLength(2)
		]);

		this.employeeForm.controls.email.setValidators([
			Validators.required,
			Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
		]);

		this.employeeForm.controls.department.setValidators([
			Validators.required
		]);

		this.employeeForm.controls.job.setValidators([
			Validators.required
		]);

		this.employeeForm.controls.salary.setValidators([
			Validators.required,
			this.customValidations.bind(this.employeeForm)
		]);

	}

  ngOnInit() {
		if(localStorage.getItem("employee")){

			this.oldDataEmployee = JSON.parse(localStorage.getItem("employee"));
			this.employeeForm.patchValue(
				this.oldDataEmployee
			);
			localStorage.removeItem("employee");
		}else{
			this.oldDataEmployee = {};

		}
		// this.employeeForm.controls['department'].setValue( this.department );
	}

	customValidations(control: FormControl): {[key: string]: any} | null {
		let employeeForm:any = this;
		// console.log(employeeForm.controls.email.value);

		let data = control.value;
		return isNaN(data) || Number(data) < 1 ? {'customValidations': {value: control.value}} : null;
	}


	resetForm(){
		this.employeeForm.reset();
	}

	saveChanges(){
		// console.log( this.employeeForm );
		// console.log( this.employeeForm.controls );
    // console.log( this.employeeForm.value );
		if(this.employeeForm.valid){
			if(JSON.stringify(this.oldDataEmployee) !== "{}"){
				// UPDATE EMPLOYEE
				console.log('UPDATE EMPLOYEE');
				let newDataEmployee = {...this.employeeForm.value};
				// console.log(this.oldDataEmployee._id);
				// console.log(newDataEmployee);

				this._employeesService.updateEmployee(this.oldDataEmployee._id,newDataEmployee).subscribe(
					resp => {
						// display its headers
						const keys = resp.headers.keys();
						let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
						// access the body directly, which is typed as `Config`.
						let data = { ... resp.body };

						// console.log('updatePost');
						// console.log(headers);
						// console.log(data);
						this.oldDataEmployee={};
						this.confirmChange();
					}
				);

			}else{
				//ADD NEW EMPLOYEE
				console.log('ADD NEW EMPLOYEE');
				let newEmployee = Object.assign(this.employeeForm.value);
				console.log(newEmployee);

				this._employeesService.addEmployee(newEmployee).subscribe(
					resp => {
						// display its headers
						const keys = resp.headers.keys();
						let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
						// access the body directly, which is typed as `Config`.
						let data = { ... resp.body };

						// console.log('addPost');
						// console.log(headers);
						// console.log(data);
						this.confirmChange();

					}
				);
			}
		}
  }

	confirmChange(){
		this.resetForm();
		this.showMsg = !this.showMsg;
		var nIntervId = setInterval(()=> {
			this.showMsg = !this.showMsg;
			this.router.navigate( ['employees']);
			clearInterval(nIntervId);
		}, 1000);

	}


}
