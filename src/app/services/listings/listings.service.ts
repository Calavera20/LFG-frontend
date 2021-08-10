import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  getGroupsForGameId(gameId: String) {
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

  createGroup(description: String, creator: String, playerLimit: String, gameId: String){
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
