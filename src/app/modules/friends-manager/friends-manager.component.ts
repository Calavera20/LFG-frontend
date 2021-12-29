import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-friends-manager',
  templateUrl: './friends-manager.component.html',
  styleUrls: ['./friends-manager.component.css']
})
export class FriendsManagerComponent implements OnInit {

  userId: String
  friendsData: any;
  constructor(private userService: UserService,
    private spinner: NgxSpinnerService) { 
    this.userId=localStorage.getItem('userId');
  }


  //pole na wysłanie zaproszenia po username
  //wyswietlanie każdej z tablic
  ngOnInit(): void {
    console.log(this.userId)
    this.userService.getAllFriendsData(this.userId).subscribe(
      (data) => {
        console.log(data)
        this.friendsData = data;
        this.spinner.hide();
      },
      (err) => {
        console.log(err)
        this.spinner.hide();
      }
    );;
  }

}
