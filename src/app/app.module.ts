import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";


import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';


import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { CallerService } from './services/caller.service';

import { TopbarAsComponent } from './topbar-as/topbar-as.component';
import { MenubarAsComponent } from './menubar-as/menubar-as.component';
import { LoginAsComponent } from './login-as/login-as.component';
import { FormAsComponent } from './form-as/form-as.component';
import { MainAsComponent } from './main-as/main-as.component';
import { SearchAsComponent } from './search-as/search-as.component';
import { MuestraAsComponent } from './muestra-as/muestra-as.component';
import { TransferAsComponent } from './transfer-as/transfer-as.component';

import { PatientAsComponent } from './patient-as/patient-as.component';
import { MessageAsComponent } from './message-as/message-as.component';


@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StorageServiceModule,
    RouterModule.forRoot([
      { path: '', component: LoginAsComponent },
      { path: 'main', component: MainAsComponent },
      { path: 'sample/:action', component: MuestraAsComponent },
      { path: 'sample/:action/byCode/:code', component: MuestraAsComponent },
      { path: 'sample/:action/byCardId/:cardID', component: MuestraAsComponent },
      ]),
    
  ],entryComponents: [
   MessageAsComponent
  ],
  declarations: [ 
    AppComponent, 
    TopbarAsComponent,
    MenubarAsComponent,
    LoginAsComponent,
    FormAsComponent,
    MainAsComponent,
    SearchAsComponent,
    MuestraAsComponent,
    TransferAsComponent,
    PatientAsComponent,
    MessageAsComponent
     ],
  providers: [LocalStorageService,AuthService,CallerService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
