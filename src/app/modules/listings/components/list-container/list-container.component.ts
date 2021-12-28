import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Group from 'src/app/models/group.model';
import { ListingsService } from 'src/app/services/listings/listings.service';



@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
  gameTitleParameter: String;
  gameIdParameter: String;
  groups: Group[];

  constructor(private activatedRoute: ActivatedRoute,
    private listingsService: ListingsService,
    private spinner: NgxSpinnerService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.gameTitleParameter = params['title'];
      this.gameIdParameter = params['id']
    })
  }

  ngOnInit(): void {
    console.log(this.gameTitleParameter)
    console.log(this.gameIdParameter)

    this.loadGroups();
  }

  loadGroups(description?: string): void{
    this.listingsService.getGroupsForGameId(this.gameIdParameter).subscribe(
      (data) => {
        if(description){
        console.log(data)
        this.groups=data.filter(group => group.description.includes(description));
        }else{
          this.groups=data;
        }
      this.spinner.hide();
      },
      (err) => {
        console.log(err)
        
      this.spinner.hide();
      }
    );
  }

  filter(description: string) {
    this.loadGroups(description);
  }
}
