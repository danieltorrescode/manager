import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup, FormControl, Validators,
	FormArray,FormBuilder } from '@angular/forms';
import { AuthService, User } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	message: string;
	loginForm : FormGroup;
	showMsg :boolean = false;
	constructor(private router:Router,private fb: FormBuilder,
							private authService:AuthService) {
		this.loginForm = this.fb.group({
			email: [''],
			password: ['']
		});

		this.loginForm.controls.email.setValidators([
			Validators.required,
			Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
		]);

		this.loginForm.controls.password.setValidators([
			Validators.required
		]);
	}

	setMessage() {
		this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
	}

	login() {
		this.message = 'Trying to log in ...';

		if(this.loginForm.valid){
			console.log(this.loginForm.value);
			this.authService.login(this.loginForm.value).subscribe(
				resp => {
					// display its headers
					const keys = resp.headers.keys();
					let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
					// access the body directly, which is typed as `Config`.
					let data = { ... resp.body };

					// console.log('addPost');
					// console.log(headers);
					// console.log(data);

					if(data.success){
						this.authService.isLoggedIn = true;
						this.setMessage();
						// Get the redirect URL from our auth service
						// If no redirect has been set, use the default
						let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
						localStorage.setItem("token", data.token );
						localStorage.setItem("user", JSON.stringify(data.user) );
						this.confirmUser(redirect);

					}else{
						this.authService.isLoggedIn = false;
						this.setMessage();

					}
				}
			);
		}


	}

	confirmUser(redirect){
		this.showMsg = !this.showMsg;
		var nIntervId = setInterval(()=> {
			this.showMsg = !this.showMsg;
			// Redirect the user
			this.router.navigate([redirect]);
			clearInterval(nIntervId);
		}, 2000);

	}

	logout() {
		this.authService.logout();
		this.setMessage();
	}

}
