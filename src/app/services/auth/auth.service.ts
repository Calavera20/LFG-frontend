import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {

    }


    login(username, password) {
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe()
              
            };
    

    logout() {
        
        localStorage.removeItem('currentUser');
        
    }
}