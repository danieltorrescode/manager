import { Component, OnInit,Input ,OnChanges, SimpleChanges,Output ,EventEmitter,DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup, FormControl, Validators,
	FormArray,FormBuilder } from '@angular/forms';
import { DepartmentsService ,Department } from '../departments.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})

export class DepartmentFormComponent implements OnInit, OnChanges,DoCheck {
	@Input() selectedDepartment:any;
  @Output() selectedDepartmentChanges = new EventEmitter<boolean>();

	departmentForm : FormGroup;
	showMsg :boolean = false;

  constructor(private router:Router,private fb: FormBuilder,
							private departmentsService:DepartmentsService) {
		this.departmentForm = this.fb.group({
			name: [''],
			description: [''],
			director: [''],
			employees: [''],
			img: ['']
		});

		this.departmentForm.controls.name.setValidators([
			Validators.required,
			Validators.minLength(2)
		]);

		this.departmentForm.controls.description.setValidators([
			Validators.required,
			Validators.minLength(2)
		]);

		this.departmentForm.controls.director.setValidators([
			Validators.required,
			Validators.minLength(2)
		]);

		this.departmentForm.controls.employees.setValidators([
			Validators.required,
			this.customValidations.bind(this.departmentForm)
		]);


	}

	customValidations(control: FormControl): {[key: string]: any} | null {
		let departmentForm:any = this;
		// console.log(departmentForm.controls.email.value);
		let data = control.value;
		return isNaN(data) || Number(data) < 1 ? {'customValidations': {value: control.value}} : null;
	}

	resetForm(){
		this.selectedDepartment={};
		this.departmentForm.reset();
	}

  ngOnInit() {
  }

	ngOnChanges(changes: SimpleChanges) {
	  for (let propName in changes) {
	    let chng = changes[propName];
	    let cur  = JSON.stringify(chng.currentValue);
	    let prev = JSON.stringify(chng.previousValue);
	    console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);

			if(chng.currentValue){
				this.departmentForm.patchValue(
					chng.currentValue
				);
			}

	  }
	}

	ngDoCheck(){

	}


	saveChanges(){
		if(this.departmentForm.valid ){
			console.log(this.departmentForm.value);

			if(this.selectedDepartment._id){
					console.log('UPDATE EMPLOYEE');
				this.departmentsService.updateDepartment(this.selectedDepartment._id,this.departmentForm.value).subscribe(
					resp => {
						// display its headers
						const keys = resp.headers.keys();
						let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
						// access the body directly, which is typed as `Config`.
						let data = { ... resp.body };

						// console.log('updatePost');
						// console.log(headers);
						// console.log(data);
						this.selectedDepartment={};
						this.confirmChange();
					}
				);

			}else{
					console.log('ADD NEW EMPLOYEE');
				this.departmentsService.addDepartment(this.departmentForm.value).subscribe(
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
		this.selectedDepartmentChanges.next(true);
		this.showMsg = !this.showMsg;
		var nIntervId = setInterval(()=> {
			this.showMsg = !this.showMsg;
			clearInterval(nIntervId);
		}, 1000);

	}
}
