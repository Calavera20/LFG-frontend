import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Group from 'src/app/models/group.model';
import { GraphqlSubscriptionService } from 'src/app/services/graphqlSubscriptionService/graphql-subscription.service';
import { GroupService } from 'src/app/services/group/group.service';
import { ListingsService } from 'src/app/services/listings/listings.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input()
  groupId: string;
  groupIdParameter: String;
  group: Group;
  isCreator: boolean;
  requestUsernames: String[] = [];

  permission: Observable<any>;
  requests: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute,
    private listingsService: ListingsService,
    private spinner: NgxSpinnerService,
    private gqlSubscriptionsService: GraphqlSubscriptionService,
    private router:Router,
    private groupService: GroupService,
    private location: Location) {
      
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupIdParameter = params['groupId'];

    }) }

  ngOnInit(): void {
    
    this.getGroupData();
    this.setupPermission();
  }

  checkMembership(){
    //getCurrentMembers
    if(!this.group.members.includes(localStorage.getItem("currentUser"))){
      this.location.back()
    }
    if(this.group.creator==localStorage.getItem("currentUser")){
      this.subscribeToRequests();
  }
  }

  getGroupData(){
    this.listingsService.getGroupByGroupId(this.groupIdParameter).subscribe(
      (data) => {
      this.group = data;
      
      this.checkMembership();
      this.isCreator=this.group.creator===localStorage.getItem("currentUser")
      this.spinner.hide();
      },
      (err) => {
        console.log(err)   
      this.spinner.hide();
      }
    );
  }
  subscribeToRequests(){
    this.requests = this.gqlSubscriptionsService.subscribeToRequests(this.group.id).pipe(map(({ data }) => data.requestAdded))
    this.requests.subscribe(data => {
      console.log(data)
      if(data.data.includes("join request")){
        let requestUsername = data.data.substr(13);
        this.requestUsernames.push(requestUsername);
      }
    })
  }

  deleteGroup(){
    this.groupService.removeGroup(this.group.id).subscribe(()=> this.router.navigate(['dashboard']));
  }

  setupPermission(){
    this.permission = this.gqlSubscriptionsService.subscribeToPermission(this.groupIdParameter).pipe(map(({ data }) => data.groupPermissionChanged))
    this.permission.subscribe(data => {

      let removalMessage= "remove "+localStorage.getItem("currentUser") 
      if(data.change == removalMessage){
        this.router.navigate(['dashboard'])
      }
    })
  }

  accept(username: String){
    this.groupService.acceptRequest(this.group.id, username).subscribe(()=> this.getGroupData());
    this.requestUsernames = this.requestUsernames.filter(username => username !== username);
  }

  decline(username: String){
    this.groupService.declineRequest(this.group.id, username).subscribe();
    this.requestUsernames = this.requestUsernames.filter(username => username !== username);
  }


}
