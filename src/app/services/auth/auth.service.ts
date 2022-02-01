import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

class Token {
  token: string;
}

//Serwis odpowiadający za wysyłanie zapytań dotyczących autentykacji
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo, private spinner: NgxSpinnerService) {}

  //wysyłanie zapytania z informacjami do logowania
  login(username, password) {
    this.spinner.show();
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation Login{
            login(username: "${username}", password: "${password}"){
              token,
              user {
                id,
                username,
                email
              }
            }
        }
        `,
      })
      .pipe(
        map((res) => {
          let { data } = res;
          if (data.login.user.username !== username) throw new Error('error');
          else {
            localStorage.setItem('currentUser', username);
            localStorage.setItem('userId', data.login.user.id);
            localStorage.setItem('token', data.login.token);
            localStorage.setItem('email', data.login.user.email);
          }
        })
      );
  }
  //wysyłanie zapytania z informacjami do rejestracji
  signup(username, email, password) {
    this.spinner.show();
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation Signup{
            signup(username: "${username}", email: "${email}" password: "${password}")
        }
        `,
      })
      .pipe(
        map((res) => {
          let { data } = res;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
