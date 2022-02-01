import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { FriendManagerBarComponent } from './components/friend-manager-bar/friend-manager-bar.component';
import { FriendsManagerComponent } from './friends-manager.component';

describe('FriendsManagerComponent', () => {
  let component: FriendsManagerComponent;
  let fixture: ComponentFixture<FriendsManagerComponent>;
  // let myService: MyService;
  let userService: UserService;
  let spinner: NgxSpinnerService;
  let userServiceMock;
  // let serviceSpy: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    // const spy = spyOn(userService.getAllFriendsData('id'), 'subscribe')
    await TestBed.configureTestingModule({
      declarations: [FriendsManagerComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgxSpinnerService },
        {
          provide: UserService,
          useValue: {
            getAllFriendsData: () =>
              of({
                userId: '61db1d38a9021716d6ab99ba',
                friends: [
                  {
                    userId: '61dd4321a7a4dc85fe0385bc',
                    username: 'test3',
                    email: 'test3@gmail.com',
                    _id: { $oid: '61e6add3f631aaf795cda500' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61ed5a2c720507615e3decf1' },
                  },
                  {
                    userId: '61ed8c50c135444215cdee1a',
                    username: 'test6',
                    email: 'test@gmail.com',
                    _id: { $oid: '61f68d2d1c1df0d5a7a3b3f3' },
                  },
                ],
                pending: [],
                invited: [
                  {
                    userId: '61ed5fb7720507615e3ded05',
                    username: 'test4',
                    email: 'test4@gmail.com',
                    _id: { $oid: '61ed8c1bc135444215cdee09' },
                  },
                  {
                    userId: '61ed5fca720507615e3ded0b',
                    username: 'test5',
                    email: 'test5@gmail.com',
                    _id: { $oid: '61ed8c1dc135444215cdee0e' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61effaffe7b0130d19948566' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61effb4dde68c240a8b4b367' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61effb93de68c240a8b4b375' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61effbbaa4db34e6c1396e0a' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61effbe8a4db34e6c1396e2e' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61effc6c2decbb72ec180cb3' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61effdcb2decbb72ec180d29' },
                  },
                  {
                    userId: '61db2048a9021716d6ab99cb',
                    username: 'test2',
                    email: 'test2@gmail.com',
                    _id: { $oid: '61f00124716db98912e402a9' },
                  },
                ],
              }),
          },
        },
      ],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);
    spinner = TestBed.inject(NgxSpinnerService);
  });

  describe('on component creation', () => {
    it('setFriendsData should be called', async () => {
      expect(component).toBeTruthy();
      jest.spyOn(component, 'setFriendsData');

      fixture.whenStable().then(() => {
        expect(component.setFriendsData).toHaveBeenCalled();
      });
    });
  });
});
