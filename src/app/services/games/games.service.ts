import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAllGameCards() {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          query {
            getGameCards {
              imageB64
              title
            }
          }
        `,
      })
      .pipe(
        map((res) => {
          return res.data.getGameCards;
        })
      );
  }
}
