import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

class Token{
    token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  login(username, password) {
    this.apollo.mutate<any>({
        mutation: gql`
        mutation Login{
            login(username: "${username}", password: "${password}")
        }
        `
    }).subscribe(({data}) => {
        localStorage.setItem("token",data.login);
        console.log(data)
    })

  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
