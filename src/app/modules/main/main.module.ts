import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './components/log-in/log-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [    
    LogInComponent,
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    SignupComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MainModule { }
