import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { GameCardComponent } from './components/game-card/game-card/game-card.component';
import { SharedModule } from '../shared/shared.module';
import { GroupListingsComponent } from './components/group-listings/group-listings.component';

@NgModule({
  declarations: [DashboardComponent, GameCardComponent, GroupListingsComponent],
  imports: [CommonModule, SharedModule],
})
export class DashboardModule {}
