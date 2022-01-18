import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ListingsModule } from './modules/listings/listings.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GroupModule } from './modules/group/group.module';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';
import {HttpLink} from 'apollo-angular/http'
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { FriendsManagerModule } from './modules/friends-manager/friends-manager.module';
import { AuthInterceptorService } from './services/AuthInterceptor/auth-interceptor.service';
import { MainModule } from './modules/main/main.module';

@NgModule({
  declarations: [
    AppComponent
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
    GroupModule,
    MainModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink): ApolloClientOptions<any> {
        const http = httpLink.create({
          uri: 'http://lfg-server-jakub-remiszewski.herokuapp.com/',
        });

        const ws = new WebSocketLink({
          uri: 'ws://lfg-server-jakub-remiszewski.herokuapp.com/',
          options: {
            reconnect: true,
          },
        });

        const link = split(
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
