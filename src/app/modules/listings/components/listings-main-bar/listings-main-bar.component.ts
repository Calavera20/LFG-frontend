import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListingCreatorComponent } from '../listing-creator/listing-creator.component';

@Component({
  selector: 'app-listings-main-bar',
  templateUrl: './listings-main-bar.component.html',
  styleUrls: ['./listings-main-bar.component.css'],
})
export class ListingsMainBarComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  @Output()
  filterEvent = new EventEmitter<string>();

  ngOnInit(): void {}

  description = new FormControl('', [Validators.maxLength(40)]);

  open() {
    const modalRef = this.modalService.open(ListingCreatorComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.name = 'Creator';
  }

  filter() {
    let value = this.description.value;
    this.filterEvent.emit(value);
  }
}
