import { Component, Input, OnInit } from '@angular/core';

//Komponent odpowiadający za wiadomości w czacie tekstowym
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input()
  message;

  creationTimeMs: string;
  creationTime: string;

  username: String;
  constructor() {}

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
    let date = new Date(this.message.creationDate);
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (minute < 10) {
      this.creationTime = hour + ':0' + minute;
    } else {
      this.creationTime = hour + ':' + minute;
    }
  }
}
