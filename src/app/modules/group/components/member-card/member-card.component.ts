import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {


  @Input()
  member: string;
  @Input()
  isCreator: boolean
  currentUsername:string
  groupIdParameter: string
  constructor(private groupService: GroupService,
    private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupIdParameter = params['groupId'];
      this.currentUsername = localStorage.getItem("currentUser");
    })
  }

  ngOnInit(): void {
  }

  remove(){
    this.groupService.removeMember(this.groupIdParameter ,this.member).subscribe();
  }
}
