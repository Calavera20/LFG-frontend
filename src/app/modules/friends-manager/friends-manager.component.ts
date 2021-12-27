import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-manager',
  templateUrl: './friends-manager.component.html',
  styleUrls: ['./friends-manager.component.css']
})
export class FriendsManagerComponent implements OnInit {

  constructor() { }


  //trzymamy liste znajomych jako para id, username 
  //trzymamy zaproszenia znajomych w tej samej postaci w oddzielnej tablicy dla każdego
  //trzymamy liste użytkowników których zaprosiliśmy
  //wyszukiwanie po username 
  //pole na wysłanie zaproszenia po username
  ngOnInit(): void {
  }

}
