import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Group from 'src/app/models/group.model';
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

  constructor(private activatedRoute: ActivatedRoute,
    private listingsService: ListingsService,
    private spinner: NgxSpinnerService) {
      
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupIdParameter = params['groupId'];

    }) }

  ngOnInit(): void {
    this.getGroupData();
  }
  getGroupData(){
    this.listingsService.getGroupByGroupId(this.groupIdParameter).subscribe(
      (data) => {
        console.log(data)
      this.group = data;
      this.spinner.hide();
      console.log(this.group)
      },
      (err) => {
        console.log(err)
        
      this.spinner.hide();
      }
    );
  }

}
