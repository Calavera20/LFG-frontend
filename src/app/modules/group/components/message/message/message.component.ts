import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
@Input()
message;

creationTimeMs: string;
creationTime: string;

username: String;
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem("currentUser")
    let date = new Date(this.message.creationDate)
    let hour =  date.getHours()
    let minute =  date.getMinutes()
    this.creationTime = hour + ":" + minute;
  }

}
