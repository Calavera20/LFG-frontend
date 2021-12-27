import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendManagerBarComponent } from './friend-manager-bar.component';

describe('FriendManagerBarComponent', () => {
  let component: FriendManagerBarComponent;
  let fixture: ComponentFixture<FriendManagerBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendManagerBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendManagerBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
