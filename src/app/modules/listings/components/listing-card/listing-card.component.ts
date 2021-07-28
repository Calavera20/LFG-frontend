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
  groupId: string;

  isWaiting: boolean;

  isDeclined: boolean;

  isAccepted: boolean;

  constructor(private router:Router) {}

  ngOnInit(): void {}


  onClick(){
    this.router.navigate(['group'])
  }

  private sendJoinRequest(){

  }

  private handleRequestResponse(){

  }


}
