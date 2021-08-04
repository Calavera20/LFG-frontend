import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsComponent } from './listings.component';
import { ListingsMainBarComponent } from './components/listings-main-bar/listings-main-bar.component';
import { ListingCreatorComponent } from './components/listing-creator/listing-creator.component';
import { ListingCardComponent } from './components/listing-card/listing-card.component';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { ListingsRoutingModule } from './listings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { JoiningGroupComponent } from './components/joining-group/joining-group.component';

@NgModule({
  declarations: [
    ListingsComponent,
    ListingsMainBarComponent,
    ListingCreatorComponent,
    ListingCardComponent,
    ListContainerComponent,
    JoiningGroupComponent,
  ],
  imports: [CommonModule, ListingsRoutingModule, SharedModule],
})
export class ListingsModule {}
