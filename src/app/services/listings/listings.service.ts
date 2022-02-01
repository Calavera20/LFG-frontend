import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';
import { NgxSpinnerService } from 'ngx-spinner';

//Serwis odpowiadający za wysyłanie zapytań dotyczących listy grup
@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private spinner: NgxSpinnerService
  ) {}

  //pobieranie listy grup dla danej gry
  getGroupsForGameId(gameId: String) {
    this.spinner.show();
    return this.apollo
      .query<any>({
        query: gql`
          query {
            getGroupsForGameId(gameId:"${gameId}") {
              id
              members
              creationDate
              gameId
              isOpen
              currentSize
              playerLimit
              creator
              description
            }
          }
        `,
      })
      .pipe(
        map((res) => {
          return res.data.getGroupsForGameId;
        })
      );
  }
  getGroupByGroupId(groupId: String) {
    this.spinner.show();
    return this.apollo
      .query<any>({
        query: gql`
          query {
            getGroupByGroupId(groupId:"${groupId}") {
              id
              members
              creationDate
              gameId
              isOpen
              currentSize
              playerLimit
              creator
              description
            }
          }
        `,
      })
      .pipe(
        map((res) => {
          return res.data.getGroupByGroupId;
        })
      );
  }

  createGroup(
    description: String,
    creator: String,
    playerLimit: String,
    gameId: String
  ) {
    this.spinner.show();
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation {
            createGroup(description:"${description}", creator: "${creator}", playerLimit: "${playerLimit}", gameId: "${gameId}") 
            
          }
        `,
      })
      .pipe(
        map((res) => {
          return res.data.createGroup;
        })
      );
  }
}
