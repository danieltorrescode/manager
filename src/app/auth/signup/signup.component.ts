import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup, FormControl, Validators,
	FormArray,FormBuilder } from '@angular/forms';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	signupForm : FormGroup;
	showMsg :boolean = false;
  constructor(private router:Router,private fb: FormBuilder,
							private authService:AuthService) {
		this.signupForm = this.fb.group({
			firstName: [''],
			lastName: [''],
			email: [''],
			password: [''],
			passwd: ['']
		}, { validator: this.customValidations });

		this.signupForm.controls.firstName.setValidators([
			Validators.required,
			Validators.minLength(2)
		]);

		this.signupForm.controls.lastName.setValidators([
			Validators.required,
			Validators.minLength(2)
		]);

		this.signupForm.controls.email.setValidators([
			Validators.required,
			Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
		]);

		this.signupForm.controls.password.setValidators([
			Validators.required
		]);

		this.signupForm.controls.passwd.setValidators([
			Validators.required
		]);
	}

  ngOnInit() {
  }

	customValidations(control: FormGroup): {[key: string]: any} | null {
		// let signupForm:any = this;
		// console.log(control.value != signupForm.controls.passwd.value );

		const password = control.value.password;
	  const passwd = control.value.passwd;
		return password != passwd ? {'customValidations': true } : null;
	}



	resetForm(){
		this.signupForm.reset();
	}

	saveChanges(){
		console.log(this.signupForm);
		if(this.signupForm.valid){
			this.authService.addUser(this.signupForm.value).subscribe(
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

	confirmChange(){
		this.resetForm();
		this.showMsg = !this.showMsg;
		var nIntervId = setInterval(()=> {
			this.showMsg = !this.showMsg;
			this.router.navigate( ['login']);
			clearInterval(nIntervId);
		}, 1000);

	}
}
