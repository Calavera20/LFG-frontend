import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from '@angular/router';
import { GameCardComponent } from "./game-card.component";

describe("GameCardComponent", () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let myService: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Router}],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    myService = TestBed.inject(Router);
  });

  describe('After clicking on game card', () => {
    it('should call redirect function', async () => {
      expect(component).toBeTruthy();
      jest.spyOn(component, 'redirect');

      let card = fixture.debugElement.nativeElement.querySelector('mat-card');
      card.click();

      fixture.whenStable().then(() => {
        expect(component.redirect).toHaveBeenCalled();
      });
    });

  });
})