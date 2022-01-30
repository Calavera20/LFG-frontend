import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private spinner: NgxSpinnerService
  ) {}

  //wysyłanie zapytania o informacje o wszystkich kartach gier
  getAllGameCards() {
    this.spinner.show();
    return this.apollo
      .mutate<any>({
        mutation: gql`
          query {
            getGameCards {
              id
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
