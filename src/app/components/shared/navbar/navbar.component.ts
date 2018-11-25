import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private authService: AuthService) { }

  ngOnInit() {
  }

	searchEmployee(term:string){
		// console.log(term);
		this.router.navigate( ['employees/search',term]);
	}

	logout() {
		this.authService.logout();
		this.router.navigate( ['home']);
	}

}
