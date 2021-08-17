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

  elapsedTime: number;

  constructor(private router:Router) {}

  ngOnInit(): void {
    console.log(this.groupData)
    this.calculateElapsedTime(this.groupData.creationDate)
  }

  calculateElapsedTime(time: number){
    let timeDiff = Date.now() - time;
    this.elapsedTime = Math.trunc(timeDiff/60000);
  }


  onClick(){
    this.router.navigate(['group'],{queryParams: {groupId: "id"}})
  }

  private sendJoinRequest(){

  }

  private handleRequestResponse(){

  }


}
