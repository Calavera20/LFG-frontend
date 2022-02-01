import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { UserService } from 'src/app/services/user/user.service';

//Komponent odpowiadający za menedżer znajomych
@Component({
  selector: 'app-friends-manager',
  templateUrl: './friends-manager.component.html',
  styleUrls: ['./friends-manager.component.css'],
})
export class FriendsManagerComponent implements OnInit {
  userId: String;
  friendsData: any;
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.userService.getAllFriendsData(this.userId).subscribe(
      (data) => {
        this.setFriendsData(data);
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  setFriendsData(data) {
    this.friendsData = data;
  }
}
