import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Komponent odpowiadający karty gier na panelu głownym
@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  @Input() gameId: string;

  @Input() title: string;

  @Input() imageB64: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirect() {
    this.router.navigate(['listings'], {
      queryParams: { id: this.gameId, title: this.title },
    });
  }
}
