import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input() gameId: string;

  @Input() title: string;

  @Input() imageB64: string;

  

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.gameId)
  }

  redirect(){
    this.router.navigate(["listings"],{queryParams: {id: this.gameId, title: this.title}})
    console.log("pa już lece")
  }

}
