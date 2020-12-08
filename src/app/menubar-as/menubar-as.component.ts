import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-menubar-as',
  templateUrl: './menubar-as.component.html',
  styleUrls: ['./menubar-as.component.css']
})
export class MenubarAsComponent implements OnInit {

  @Input()
  title;

  constructor() { }

  ngOnInit() {
  }

}