import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

//Serwis odpowiadający za wysyłanie zapytań dotyczących wiadomości czatu tekstowego
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private spinner: NgxSpinnerService
  ) {}

  //wysyłanie wiadomości
  sendMessage(message: any) {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation {
            addMessage(message: {creator: "${message.creator}", text: "${message.text}", creationDate:"${message.creationDate}", channelId: "${message.channelId}"}) {
              text
              creator
              creationDate
              channelId
            }
          }
        `,
      })
      .pipe(
        map((res) => {
          return res.data.addMessage;
        })
      );
  }
}
