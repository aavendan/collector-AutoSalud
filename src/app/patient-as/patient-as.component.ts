import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MessageAsComponent } from '../message-as/message-as.component';

import {CallerService} from '../services/caller.service';
import { Router, ActivatedRoute } from '@angular/router';

import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}


@Component({
  selector: 'app-patient-as',
  templateUrl: './patient-as.component.html',
  styleUrls: ['./patient-as.component.css']
})
export class PatientAsComponent implements OnInit {


  formGroup: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  
  patient: any = '';
  isRegister: boolean = false;
  isAddTest: boolean = false;
  post: any = '';

  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private callerService: CallerService,
    private dialog: MatDialog) {

    this.patient = {'cardid':null, 'email':null};
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'cardid': [this.patient.cardid, Validators.required],
      'email': [this.patient.email, null]
    }, {
      validator: this.formValidator
    });
    
  }

  formValidator(form: FormGroup) {
    
    let condition1 = String(form.get('cardid').value).length != 10;
    let condition2 = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.get('email').value);

    //console.log(condition1, condition2)

    return null // {CardId: condition1, Email: condition2};
  }

  onSubmit(post) {
    
  }

  search() {
    this.callerService.searchUser(this.formGroup.get('cardid').value).subscribe( (response:any) => {
      if(response.data.length > 0) {


        this.router.navigate(['/sample/add/byCardId/'+this.formGroup.get('cardid').value]);
        


      } else {
        
        this.dialog.open(MessageAsComponent, {
          width: '400px',
          data: {title: 'AutoSalud', text: 'Registre el paciente antes de agregar las muestras'}
        });
        
        this.isAddTest = false;
        this.isRegister = true;
      }

    })
  }

  async registerPatient() {

    let emailValue = this.formGroup.get('email').value

    if(emailValue) {
      let result = await this.callerService.registerUser(
      this.formGroup.get('cardid').value,
      this.formGroup.get('email').value) 

      if(result) {
        
        this.dialog.open(MessageAsComponent, {
          width: '400px',
          data: {title: 'AutoSalud', text: 'El usuario ha sido registrado con el código '+result.code}
        });

        
        this.router.navigate(['/sample/add/byCardId/'+this.formGroup.get('cardid').value]);
      } else {
        this.dialog.open(MessageAsComponent, {
          width: '400px',
          data: {title: 'AutoSalud', text: 'Ocurrió un error en el servidor'}
        });
      }
    } else {
      this.dialog.open(MessageAsComponent, {
        width: '400px',
        data: {title: 'AutoSalud', text: 'Agregue un correo para recibir el código de acceso'}
      });
    }

    
  }

  addTest() {
    //this.callerService.registrarMuestra(this.formGroup.get('cardid').value)
    this.router.navigate(['/sample/add/byCardId/'+this.formGroup.get('cardid').value]);
  }

  ngOnInit() {
  }

}
