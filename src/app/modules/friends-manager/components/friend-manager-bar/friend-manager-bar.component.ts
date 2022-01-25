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

  findError: boolean = false;

  ngOnInit(): void {}

  username = new FormControl('', [Validators.maxLength(40)]);

  checkUsername(username){
    this.userService.checkIfUsernameExists(username).subscribe((data)=>{

      if(data==null){
        this.findError=true
      }
    })
  }

  addFriend(){
    let value = this.username.value;
    this.checkUsername(value);
    this.userService.inviteFriend(value);
  }
}
