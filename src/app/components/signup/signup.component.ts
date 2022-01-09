import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  matcherValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.matcherValidator) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ matcherValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  signupForm = this.formBuilder.group(
    {
      usernameFormControl: new FormControl('', [Validators.required]),
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirmationFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validator: this.matcherValidator(
        'passwordFormControl',
        'passwordConfirmationFormControl'
      ),
    }
  );

  ngOnInit(): void {
    localStorage.clear();
  }

  submit() {
    if (this.signupForm.valid) {
      this.authService
        .signup(
          this.signupForm.controls.usernameFormControl.value,
          this.signupForm.controls.emailFormControl.value,
          this.signupForm.controls.passwordFormControl.value
        )
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.router.navigate(['login']);
          },
          (err) => {
            console.log(err)
            this.spinner.hide();
          }
        );
    }
  }
}
