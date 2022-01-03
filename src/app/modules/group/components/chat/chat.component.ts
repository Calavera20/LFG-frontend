import { Component, Input, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphqlSubscriptionService } from 'src/app/services/graphqlSubscriptionService/graphql-subscription.service';

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

  data: Observable<any>;

  constructor(apollo: Apollo,
    private gqlSubscriptionsService: GraphqlSubscriptionService) { }

  ngOnInit(): void {
    console.log(this.groupId)
    this.data = this.gqlSubscriptionsService.getData(this.groupId).pipe(map(({ data }) => data.messageAdded));
    this.data.subscribe(data =>{
      console.log(data)
      this.messages.push(data)
    })
  }

  

}
