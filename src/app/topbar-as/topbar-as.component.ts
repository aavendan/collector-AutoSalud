import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-topbar-as',
  templateUrl: './topbar-as.component.html',
  styleUrls: ['./topbar-as.component.css']
})
export class TopbarAsComponent implements OnInit {

  @Input()
  title;
 

  constructor() { }

  ngOnInit() {
  }

}