import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsManagerComponent } from './friends-manager.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { FriendManagerBarComponent } from './components/friend-manager-bar/friend-manager-bar.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FriendsManagerComponent,
    FriendCardComponent,
    FriendManagerBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FriendsManagerModule { }
