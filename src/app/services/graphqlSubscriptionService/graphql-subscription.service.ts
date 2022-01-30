import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphqlSubscriptionService {
  private query: any;

  constructor(private apollo: Apollo) {}
  //nawiązanie komunikacji wss dotyczącej wiadomości czatu tekstowego
  subscribeToMessages(chatId: String): Observable<any> {
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
      fetchPolicy: 'no-cache',
    });
  }
  //nawiązanie komunikacji wss dotyczącej próśb o dołączenie
  subscribeToRequests(groupId: String): Observable<any> {
    this.query = gql`
    subscription{
      requestAdded(groupId: "${groupId}"){
        data
        groupId
      }
    }
    `;

    return this.apollo.subscribe({
      query: this.query,
      fetchPolicy: 'no-cache',
    });
  }

  //nawiązanie komunikacji wss dotyczącej zmiany zezwoleń grup
  subscribeToPermission(groupId: String): Observable<any> {
    this.query = gql`
    subscription{
      groupPermissionChanged(groupId: "${groupId}"){
        groupId
        change
      }
    }
    `;

    return this.apollo.subscribe({
      query: this.query,
      fetchPolicy: 'no-cache',
    });
  }
}
