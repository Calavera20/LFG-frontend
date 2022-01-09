import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
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
  constructor( private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    console.log(this.friendData)
  }

  invite(){
    this.spinner.show();
    this.userService.sendEmailInvitation(this.friendData).subscribe(
      (data) => {
        this.spinner.hide();
        console.log(data)

      },
      (err) => {
        this.spinner.hide();
        console.log(err)
      }
    );
  }

  accept(){
    
    this.userService.acceptFriendInvite(this.friendData).subscribe(
      (data) => {
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err)
      }
    );

 
  }



}
