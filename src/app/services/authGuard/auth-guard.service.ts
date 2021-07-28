import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route: Router) { }

  canActivate() {
    if(localStorage.getItem('currentUser')) {
      return true; 
    }else{
      this.route.navigate(['/login']);
      return false;
    }
  }
}
