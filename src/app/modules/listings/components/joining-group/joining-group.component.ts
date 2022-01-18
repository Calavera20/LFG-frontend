import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GraphqlSubscriptionService } from 'src/app/services/graphqlSubscriptionService/graphql-subscription.service';
import { GroupService } from 'src/app/services/group/group.service';
import { ListingsService } from 'src/app/services/listings/listings.service';

@Component({
  selector: 'app-joining-group',
  templateUrl: './joining-group.component.html',
  styleUrls: ['./joining-group.component.css']
})
export class JoiningGroupComponent implements OnInit {

  @Input() name;
  @Input() fromParent;

  gameIdParameter: String;
  gameTitleParameter: String;
  modalText: String;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private gqlSubscriptionService: GraphqlSubscriptionService,
    private groupService: GroupService) {
      this.modalText="Join request has been sent, please wait.";
    }


  ngOnInit(): void {
    this.checkMembership();
  }

  checkMembership(){
    if(this.fromParent.members.includes(localStorage.getItem("currentUser"))){
      this.navigateToGroup();
    }else{
      this.subscribeToJoinRequest();
    }
  }

  subscribeToJoinRequest(){
    this.gqlSubscriptionService.subscribeToRequests(this.fromParent.groupId).subscribe(data =>{
      data=data.data.requestAdded.data
      if(data.includes("accept")){
        let username = data.substr(7);
        if(username == localStorage.getItem("currentUser")){
          this.navigateToGroup();
        }
      }else{
        let username = data.substr(17);
        if(username == localStorage.getItem("currentUser")){
          this.modalText="request declined";
        }
      }})
   this.groupService.sendJoinRequest(this.fromParent.groupId,localStorage.getItem("currentUser")).subscribe();
  
  }
  navigateToGroup(){
    this.activeModal.dismiss();
    this.router.navigate(["group"],{queryParams: {groupId: this.fromParent.groupId}})
  }
}
