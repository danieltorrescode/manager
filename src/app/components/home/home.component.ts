import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	url:string;
	video:string;
  constructor() { }

  ngOnInit() {
		this.url = 'https://www.youtube.com/embed/';
		this.video = 'ig-fyQqf510';
  }


}
