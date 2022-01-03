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
import { GroupModule } from './modules/group/group.module';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';
import {HttpLink} from 'apollo-angular/http'
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { FriendsManagerModule } from './modules/friends-manager/friends-manager.module';

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
    FriendsManagerModule,
    ListingsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GroupModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink): ApolloClientOptions<any> {
        // Create an http link:
        const http = httpLink.create({
          uri: 'http://localhost:4000/',
        });

        // Create a WebSocket link:
        const ws = new WebSocketLink({
          uri: 'ws://localhost:4000/',
          options: {
            reconnect: true,
          },
        });

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          ({query}) => {
            const data = getMainDefinition(query);
            return (
              data.kind === 'OperationDefinition' && data.operation === 'subscription'
            );
          },
          ws,
          http,
        );

        return {
          link: link,
          cache: new InMemoryCache()
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
