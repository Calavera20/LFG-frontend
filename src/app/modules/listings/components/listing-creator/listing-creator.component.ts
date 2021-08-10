import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListingsService } from 'src/app/services/listings/listings.service';

@Component({
  selector: 'app-listing-creator',
  templateUrl: './listing-creator.component.html',
  styleUrls: ['./listing-creator.component.css']
})
export class ListingCreatorComponent {


  @Input() name;

  gameIdParameter: String;

  constructor(private activatedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private listingsService: ListingsService) {}


     

  description = new FormControl('', [Validators.maxLength(40)]);
  playerLimit = new FormControl('', [Validators.min(1), Validators.max(10)]);


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
 
      this.gameIdParameter = params['id']
    })
  }

  submit(){
    console.log("halo")
    this.listingsService.createGroup(this.description.value, localStorage.getItem('currentUser'), this.playerLimit.value, this.gameIdParameter).subscribe(
      (data) => {
        console.log(data)
        
      },
      (err) => {
        console.log(err)
      }
    );
  
  }

}

