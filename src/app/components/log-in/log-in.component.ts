import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

//Komponent odpowiadający za formularz logowania
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
  }
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  getErrorMessage() {
    if (this.usernameFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.usernameFormControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      this.authService
        .login(this.usernameFormControl.value, this.passwordFormControl.value)
        .subscribe(
          (res) => {
            this.router.navigate(['dashboard']);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
