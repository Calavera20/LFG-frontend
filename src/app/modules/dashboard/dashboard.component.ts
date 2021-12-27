import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import GameCard from 'src/app/models/gameCard.model';
import { GamesService } from 'src/app/services/games/games.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private gamesService: GamesService,
    private spinner: NgxSpinnerService) {}

  gameCards: GameCard[];

  ngOnInit(): void {
    this.gamesService.getAllGameCards().subscribe(
      (data) => {
        console.log(data)
        this.gameCards=data;
        this.spinner.hide();
      },
      (err) => {
        console.log(err)
        this.spinner.hide();
      }
    );
  }
}
