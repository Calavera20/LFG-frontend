import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-friend-manager-bar',
  templateUrl: './friend-manager-bar.component.html',
  styleUrls: ['./friend-manager-bar.component.css']
})
export class FriendManagerBarComponent implements OnInit {

  constructor(private userService: UserService) {}

 
  
  ngOnInit(): void {}

  username = new FormControl('', [Validators.maxLength(40)]);
  // creator = new FormControl('', [Validators.maxLength(40)]);

  addFriend(){
    let value = this.username.value;
    this.userService.inviteFriend(value);
  }
}
