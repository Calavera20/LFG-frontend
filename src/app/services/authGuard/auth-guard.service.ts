import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private route: Router) {}

  //Guard sprawdzający czy token znajduje się w local storage przed przejściem do ścieżki
  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
