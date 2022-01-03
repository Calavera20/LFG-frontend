import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlSubscriptionService {

  private query: any;

  constructor(private apollo: Apollo) {}

  getData(chatId: String): Observable<any> {
    this.query = gql`
    subscription{
      messageAdded(channelId: "${chatId}"){
        creator
        text
        creationDate
      }
    }
    `;

    return this.apollo.subscribe({
      query: this.query,
      fetchPolicy: 'no-cache'
    });
  }
}
