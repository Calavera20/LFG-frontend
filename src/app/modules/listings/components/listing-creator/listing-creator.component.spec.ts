import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCreatorComponent } from './listing-creator.component';

describe('ListingCreatorComponent', () => {
  let component: ListingCreatorComponent;
  let fixture: ComponentFixture<ListingCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
