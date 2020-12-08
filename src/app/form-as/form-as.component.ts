import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {AuthService} from '../services/auth.service';
import {CallerService} from '../services/caller.service';

@Component({
  selector: 'app-form-as',
  templateUrl: './form-as.component.html',
  styleUrls: ['./form-as.component.css']
})
export class FormAsComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'Este campo es requerido';
  post: any = '';

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private callerService: CallerService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'user': [null, Validators.required],
      'password': [null, Validators.required]
    });

    
  }

  async onSubmit(post) {
    
    let response:any = await this.callerService.login(post.user, post.password)
    
    if(response.data.length) {
      this.router.navigate(['main']);
    } else {
      alert('La combinación de usuario y contraseña no existe')
    }
      
    
    /*if(this.authService.validateAuth(post.user, post.password)) {
      this.router.navigate(['main']);
    } else {
      alert('La combinación de usuario y contraseña no existe')
    }*/
  }

}