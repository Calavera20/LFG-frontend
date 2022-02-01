import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { GameCardComponent } from './components/game-card/game-card/game-card.component';
import { SharedModule } from '../shared/shared.module';

//Moduł odpowiadający za część panelu głownego
@NgModule({
  declarations: [DashboardComponent, GameCardComponent],
  imports: [CommonModule, SharedModule],
})
export class DashboardModule {}
