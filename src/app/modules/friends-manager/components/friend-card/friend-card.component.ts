import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user/user.service';
import { FriendInviteModalComponent } from '../friend-invite-modal/friend-invite-modal.component';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css'],
})
export class FriendCardComponent implements OnInit {
  @Input()
  buttonType: any;

  @Input()
  friendData: any;
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  accept() {
    this.userService.acceptFriendInvite(this.friendData).subscribe(
      (data) => {
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  invite() {
    const modalRef = this.modalService.open(FriendInviteModalComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.name = 'Friend Invite';
    let data = {
      friendData: this.friendData,
    };

    modalRef.componentInstance.fromParent = data;
  }
}
