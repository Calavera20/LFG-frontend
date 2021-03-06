import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListingsService } from 'src/app/services/listings/listings.service';
import { NgxSpinnerService } from 'ngx-spinner';


//Komponent odpowiadający za okno modalne kreatora grup
@Component({
  selector: 'app-listing-creator',
  templateUrl: './listing-creator.component.html',
  styleUrls: ['./listing-creator.component.css'],
})
export class ListingCreatorComponent {
  @Input() name;

  gameIdParameter: String;
  gameTitleParameter: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private listingsService: ListingsService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  description = new FormControl('', [
    Validators.maxLength(40),
    Validators.minLength(8),
    Validators.required,
  ]);
  playerLimit = new FormControl('', [
    Validators.min(1),
    Validators.max(10),
    Validators.required,
    Validators.pattern(/^-?(0|[1-9]\d*)?$/),
  ]);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.gameIdParameter = params['id'];
      this.gameTitleParameter = params['title'];
    });
  }

  submit() {
    if (!this.playerLimit.errors && !this.description.errors)
      this.listingsService
        .createGroup(
          this.description.value,
          localStorage.getItem('currentUser'),
          this.playerLimit.value,
          this.gameIdParameter
        )
        .subscribe(
          (data) => {
            this.activeModal.dismiss();
            this.router.navigate(['group'], { queryParams: { groupId: data } });
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
  }
  reloadCurrentRoute() {
    this.spinner.show();
    this.router.routeReuseStrategy.shouldReuseRoute = () => true;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['listings'], {
      queryParams: { id: this.gameIdParameter, title: this.gameTitleParameter },
    });
  }
}
