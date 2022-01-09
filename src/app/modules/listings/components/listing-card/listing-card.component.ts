import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JoiningGroupComponent } from '../joining-group/joining-group.component';

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

  constructor(private router:Router,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    console.log(this.groupData)
    this.calculateElapsedTime(this.groupData.creationDate)
  }

  calculateElapsedTime(time: number){
    let timeDiff = Date.now() - time;
    this.elapsedTime = Math.trunc(timeDiff/60000);
  }


  onClick(){
    
      const modalRef = this.modalService.open(JoiningGroupComponent,{
        centered: true, size: 'lg'
      });
      modalRef.componentInstance.name = 'Joining Group';
      let data = {
        groupId: this.groupData.id,
        members: this.groupData.members
      }
      
      modalRef.componentInstance.fromParent = data;
  }
}
