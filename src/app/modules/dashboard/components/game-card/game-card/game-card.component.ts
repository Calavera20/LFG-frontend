import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input() title: string;

  @Input() imageB64: string;

  

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.title)
  }

  redirect(){
    this.router.navigate(["listings"],{queryParams: {game: "lol"}})
    console.log("pa już lece")
  }

}
