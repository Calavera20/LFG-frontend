import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css'],
})
export class ListingCardComponent implements OnInit {

  //TODO socket integration

  @Input()
  groupData: any;


  isWaiting: boolean;

  isDeclined: boolean;

  isAccepted: boolean;

  constructor(private router:Router) {}

  ngOnInit(): void {
    console.log(this.groupData)
  }


  onClick(){
    this.router.navigate(['group'],{queryParams: {groupId: "id"}})
  }

  private sendJoinRequest(){

  }

  private handleRequestResponse(){

  }


}
