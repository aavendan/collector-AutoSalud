import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import {MatTabChangeEvent} from '@angular/material/tabs';

import { Subject } from "rxjs";


//SET TABS TO BOTTOM
@Component({
  selector: 'app-main-as',
  templateUrl: './main-as.component.html',
  styleUrls: ['./main-as.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainAsComponent implements OnInit {

  reloadable: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer) { 
    this.matIconRegistry.addSvgIcon(
      "add",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/add.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "transfer",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/transfer.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "search",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/search.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "user",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/user.svg")
    );
  }

  ngOnInit() {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    //console.log('tabChangeEvent => ', tabChangeEvent);
    this.reloadable.next(true);
  } 

}