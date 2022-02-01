import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LogInComponent } from "./log-in.component";

describe("LogInComponent", () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: AuthService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogInComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AuthService}, {provide: Router}],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    component.usernameFormControl.markAsTouched();
    component.passwordFormControl.markAsTouched();
    fixture.detectChanges();
  });

  describe('leaving form with empty username', () => {
    it('should create mat-error with `Username is required` text', () => {
          let matError = fixture.debugElement.nativeElement.querySelector('.mat-error-username-required');
          expect(matError).toBeTruthy();
          expect(matError.textContent).toBe(" Username is required")
    });
  });

  describe('leaving form with empty password', () => {
    it('should create mat-error with `Password is required` text', () => {
          let matError = fixture.debugElement.nativeElement.querySelector('.mat-error-password-required');
          expect(matError).toBeTruthy();
          expect(matError.textContent).toBe(" Password is required")
    });
  });

  describe('leaving form with too short password', () => {
    it('should create mat-error with `Password is too short` text', () => {
          let matError = fixture.debugElement.nativeElement.querySelector('.mat-error-password-too-short');
          component.usernameFormControl.setValue("pass");
          fixture.detectChanges();
          fixture.whenStable().then(() => {
          expect(matError).toBeTruthy();
          expect(matError.textContent).toBe(" Password is too short")
          })
    });
  });
})