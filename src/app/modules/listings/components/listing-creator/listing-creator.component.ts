import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listing-creator',
  templateUrl: './listing-creator.component.html',
  styleUrls: ['./listing-creator.component.css']
})
export class ListingCreatorComponent implements OnInit {


  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}


  ngOnInit(): void {
  }

}

