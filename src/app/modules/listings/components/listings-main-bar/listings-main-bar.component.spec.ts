import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsMainBarComponent } from './listings-main-bar.component';

describe('ListingsMainBarComponent', () => {
  let component: ListingsMainBarComponent;
  let fixture: ComponentFixture<ListingsMainBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsMainBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsMainBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
