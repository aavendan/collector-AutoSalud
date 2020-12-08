import { Injectable } from '@angular/core';
import { USERS, UserInterface } from '../data/users';

@Injectable()
export class AuthService {

  user; 

  constructor() {
    this.user = null;
  }

  validateAuth(name: string, password: string): any {

    this.user = USERS.find(user => { 
      return user.name == name && user.name == name
    }) || null;

    return this.user;
  }

  getCurrentCenter() : any {
    return this.user || null;
  }

}