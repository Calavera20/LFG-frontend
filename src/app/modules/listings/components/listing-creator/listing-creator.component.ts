import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-listing-creator',
  templateUrl: './listing-creator.component.html',
  styleUrls: ['./listing-creator.component.css']
})
export class ListingCreatorComponent implements OnInit {


  @Input() name;

  constructor(public activeModal: NgbActiveModal,
    private listingsService: ListingsService) {}

  description = new FormControl('', [Validators.maxLength(40)]);
  playerLimit = new FormControl('', [Validators.min(1), Validators.max(10)]);


  ngOnInit(): void {
  }

  submit(){
    //this.listingsService.createNewListing();
  }

}

