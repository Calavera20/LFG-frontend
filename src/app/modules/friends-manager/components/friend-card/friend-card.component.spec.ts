import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user/user.service';
import { FriendCardComponent } from "./friend-card.component";

describe("FriendCardComponent", () => {
  let component: FriendCardComponent;
  let fixture: ComponentFixture<FriendCardComponent>;
  let userService;
  let spinner;
  let modal;
  const friendData = {
    username: "username"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: UserService}, { provide: NgxSpinnerService}, { provide: NgbModal}],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendCardComponent);
    component = fixture.componentInstance;
    component = fixture.debugElement.componentInstance;
    component.friendData = friendData;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    spinner = TestBed.inject(UserService);
    modal = TestBed.inject(UserService);
  });

  describe('on component creation', () => {
    it('username should be set', () => {
      const usernameDiv = fixture.debugElement.nativeElement.querySelector(".username").textContent;
      expect(usernameDiv).toBe(" username ");
    });


  });
  describe('click on button of type invite', () => {
    it('invite method should be calle', async () => {
      component.buttonType="invite";
      fixture.detectChanges();
      jest.spyOn(component, 'invite');
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.whenStable().then(() => {
        expect(component.invite).toHaveBeenCalled();
      });
    });


  });
  describe('click on button of type accept', () => {
    it('accept method should be calle', async () => {
      component.buttonType="accept";
      fixture.detectChanges();
      jest.spyOn(component, 'accept');
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.whenStable().then(() => {
        expect(component.accept).toHaveBeenCalled();
      });
    });


  });
 
})