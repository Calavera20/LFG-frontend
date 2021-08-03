import { Component, OnInit } from '@angular/core';
import GameCard from 'src/app/models/gameCard.model';
import { GamesService } from 'src/app/services/games/games.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private gamesService: GamesService) {}

  gameCards: GameCard[];

  ngOnInit(): void {
    this.gamesService.getAllGameCards().subscribe(
      (data) => {
        console.log(data)
        this.gameCards=data
      },
      (err) => {
        console.log(err)
      }
    );
  }
}
