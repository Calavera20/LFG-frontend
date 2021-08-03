import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

class Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  login(username, password) {
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation Login{
            login(username: "${username}", password: "${password}"){
              token,
              user {
                id,
                username
              }
            }
        }
        `,
      })
      .pipe(
        map((res) => {
          let { data } = res;
          console.log(data)
          if(data.login.user.username !== username) throw new Error("error"); else{
          localStorage.setItem('currentUser', username);
          localStorage.setItem('token', data.login);
          console.log(data);
        }
        })
      );
  }

  signup(username, password) {
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation Signup{
            signup(username: "${username}", password: "${password}")
        }
        `,
      })
      .pipe(
        map((res) => {
          let { data } = res;
          console.log(data);
        }
        )
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
