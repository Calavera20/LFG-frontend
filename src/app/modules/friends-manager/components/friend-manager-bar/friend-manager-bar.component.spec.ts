import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { FriendManagerBarComponent } from './friend-manager-bar.component';

describe('FriendManagerBarComponent', () => {
  let component: FriendManagerBarComponent;
  let fixture: ComponentFixture<FriendManagerBarComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendManagerBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: UserService }],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendManagerBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);
  });

  describe('click on button with empty form', () => {
    it('should create mat error component', async () => {
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.whenStable().then(() => {
        let matError =
          fixture.debugElement.nativeElement.querySelector('mat-error');
        expect(matError).toBeTruthy();
      });
    });
  });

  describe('click on button with empty form', () => {
    it('should set findError true', async () => {
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.whenStable().then(() => {
        let findError = component.findError;
        expect(findError).toBe(true);
      });
    });
  });
});
