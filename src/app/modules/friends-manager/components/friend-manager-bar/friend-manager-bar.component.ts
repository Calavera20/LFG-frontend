import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ifError } from 'assert';
import { UserService } from 'src/app/services/user/user.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-friend-manager-bar',
  templateUrl: './friend-manager-bar.component.html',
  styleUrls: ['./friend-manager-bar.component.css']
})
export class FriendManagerBarComponent implements OnInit {

  constructor(private userService: UserService) {}

  findError: boolean = false;

  ngOnInit(): void {}

  username = new FormControl('', [Validators.maxLength(40)]);

  addFriend(){
    let value = this.username.value;
    let result = this.userService.inviteFriend(value);
    if(result === undefined) this.findError=true;
  }
}
