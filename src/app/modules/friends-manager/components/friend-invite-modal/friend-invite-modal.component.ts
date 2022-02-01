import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user/user.service';

//Komponent odpowiadający za okno modalne używane do wysyłania zaproszenia email
@Component({
  selector: 'app-friend-invite-modal',
  templateUrl: './friend-invite-modal.component.html',
  styleUrls: ['./friend-invite-modal.component.css'],
})
export class FriendInviteModalComponent implements OnInit {
  @Input() fromParent;
  message = new FormControl('', [Validators.required]);

  constructor(
    private activatedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.spinner.show();
    this.userService
      .sendEmailInvitation(this.fromParent.friendData, this.message.value)
      .subscribe(
        (data) => {
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
        }
      );
  }
}
