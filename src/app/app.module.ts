import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './modules/shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ListingsModule } from './modules/listings/listings.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupModule } from './modules/group/group.module';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    SignupComponent,
    NotificationsComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    DashboardModule,

    ListingsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GroupModule,
    HttpLinkModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
