import { Component, Input, OnInit } from '@angular/core';

//Komponent odpowiadający za listę członków grupy
@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  @Input()
  members: any;
  @Input()
  creator: string;
  isCreator: boolean;
  constructor() { }

  ngOnInit(): void {
    this.isCreator = this.creator == localStorage.getItem("currentUser");
  }

}
