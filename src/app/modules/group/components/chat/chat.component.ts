import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphqlSubscriptionService } from 'src/app/services/graphqlSubscriptionService/graphql-subscription.service';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messagesQuery: QueryRef<any>
  messages = [];
  @Input()
  groupId: string;
  
  textArea = '';

  data: Observable<any>;

  constructor(apollo: Apollo,
    private gqlSubscriptionsService: GraphqlSubscriptionService,
    private messagesService: MessagesService) { }

  ngOnInit(): void {
    console.log(this.groupId)
    this.data = this.gqlSubscriptionsService.getData(this.groupId).pipe(map(({ data }) => data.messageAdded));
    this.data.subscribe(data =>{
      console.log(data)
      this.messages.push(data)
    })
  }

  submit(){
    console.log(this.textArea)
    let creationTime = new Date;
    let message= {
      creator: localStorage.getItem("currentUser"),
      text: this.textArea,
      creationDate: creationTime.toString(),
      channelId: this.groupId
    }
    this.messagesService.sendMessage(message).subscribe();
    this.textArea = '';
  }

  

}
