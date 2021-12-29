import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {

  @Input()
  buttonType: any;

  @Input()
  friendData: any;
  constructor( private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.friendData)
  }

  invite(){
    //this.spinner.show();
    // this.userService.inviteFriend(this.friendData).subscribe(
    //   (data) => {
    //     console.log(data)

    //   },
    //   (err) => {
    //     console.log(err)
    //   }
    // );
  }

  accept(){
    //this.spinner.show();
    this.userService.acceptFriendInvite(this.friendData).subscribe(
      (data) => {
        console.log(data)

      },
      (err) => {
        console.log(err)
      }
    );

 
  }



}
