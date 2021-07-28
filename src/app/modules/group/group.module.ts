import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './components/chat/chat.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MemberCardComponent } from './components/member-card/member-card.component';

@NgModule({
  declarations: [
    GroupComponent,
    ChatComponent,
    MembersListComponent,
    MemberCardComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class GroupModule {}
