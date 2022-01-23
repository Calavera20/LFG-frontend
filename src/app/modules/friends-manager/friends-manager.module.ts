import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsManagerComponent } from './friends-manager.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { FriendManagerBarComponent } from './components/friend-manager-bar/friend-manager-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FriendInviteModalComponent } from './components/friend-invite-modal/friend-invite-modal.component';



@NgModule({
  declarations: [
    FriendsManagerComponent,
    FriendCardComponent,
    FriendManagerBarComponent,
    FriendInviteModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FriendsManagerModule { }
