import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MessageAsComponent } from '../message-as/message-as.component';

import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {CallerService} from '../services/caller.service';

//import { MUESTRAS } from '../muestras';
//import { LocalStorageService } from '../services/local-storage.service';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-muestra-as',
  templateUrl: './muestra-as.component.html',
  styleUrls: ['./muestra-as.component.css'],
  providers: [DatePipe]
})
export class MuestraAsComponent implements OnInit {

  isDelete;
  btnDelete = false;
  sample;
  hasCardID = false; 

  formGroup: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  
  post: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private callerService: CallerService,
    //private localStorageService: LocalStorageService,
    private datePipe: DatePipe,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.sample = {'code':null, 'cardid':null, 'reference':null};

    this.route.paramMap.subscribe(params => {
      

      let code = params.get('code') || null;
      let cardID = params.get('cardID') || null;

      if(cardID) {
        this.sample.cardid = cardID;
        this.hasCardID = true;
      }

      this.isDelete = params.get('action') == 'show';

      //edit
      /*if(code) {
        //this.muestra = MUESTRAS.find(obj => obj.code == params.get('code'));
        this.sample = this.localStorageService.getOnLocalStorage(code)

      }*/

      this.createForm();
    });
    
    
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'code': [this.sample.code, Validators.required],
      'cardid': [this.sample.cardid, Validators.required],
      'reference': [this.sample.reference, Validators.required]
    }, {
      validator: this.formValidator
    });
    
  }

  formValidator(form: FormGroup) {
    
    let condition = String(form.get('cardid').value).length != 10;
    return condition ? { CardID:true} : null;
  }

  async onSubmit(post) {

    let myDate = new Date();
    let myDateString:string = this.datePipe.transform(myDate, 'yyyy/MM/dd').split("/").join("");

    let check = await this.callerService.checkTestCode(post.code) 
    
    if(!check.exists) {
      let results = await this.callerService.registerTest(
        post.cardid,
        post.code,
        post.reference,
        myDateString
      )
      
      if(results) {
        if(results.saved) {
          
          this.dialog.open(MessageAsComponent, {
            width: '400px',
            data: {title: 'AutoSalud', text:'La muestra '+post.code+' ha sido guardada'}
          });
          
          this.resetForm();
        }
        
      } else {

        this.dialog.open(MessageAsComponent, {
          width: '400px',
          data: {title: 'AutoSalud', text:'Error al guardar la muestra'}
        });

      }
    } else {
      
      this.dialog.open(MessageAsComponent, {
        width: '400px',
        data: {title: 'AutoSalud', text:'Utilice otro código para la muestra'}
      });

    }

  }

  resetForm() : void  {
    this.formGroup.patchValue({
      'code':'',
      'reference':''
    });
  }

  save(): void {
    this.btnDelete = false;
  }

  delete(): void {
    this.btnDelete = true;
  }

}
