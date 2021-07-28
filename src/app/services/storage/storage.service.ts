import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getUser(){
    return localStorage.getItem('currentUser')
  }

  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }
}
