import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql  } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private apollo: Apollo, private spinner: NgxSpinnerService) {}

  public isUserLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  getAllFriendsData(userId: String) {
      this.spinner.show();  
      return this.apollo
        .query<any>({
          query: gql`
          query {
            getFriendsList(userId: "${userId}"){
              friends {
                userId
                username
                email
              }
              pending {
                userId
                username
                email
              }
              invited {
                userId
                username
                email
              }
            }
          }
          `,
        })
        .pipe(
          map((res) => {
            return res.data.getFriendsList;
          })
        );
    }

    getUserDataForFriendInviteById(userId: String){
      this.spinner.show();  
      return this.apollo
        .query<any>({
          query: gql`
          query {
            getUserData(_id: "${userId}"){
              username
              email
            }
          }
          `,
        })
        .pipe(
          map((res) => {
            return res.data.getUserData;
          })
        );
    }
  
    getUserDataForFriendInviteByUsername(userId: String){
      this.spinner.show();  
      return this.apollo
        .query<any>({
          query: gql`
          query {
            getUserData(_id: "${userId}"){
              id
              username
              email
            }
          }
          `,
        })
        .pipe(
          map((res) => {
            return res.data.getUserData;
          })
        );
    }
 
    inviteFriend( inviteeData){
      let userData= {
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('currentUser'),
        email: localStorage.getItem('email')
      }
      let invitee= {
        userId: inviteeData.userId,
        username: inviteeData.username,
        email: inviteeData.email
      }
      console.log(userData)
      console.log(inviteeData)
      
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation {
            friendInvite(userData:"${userData}", inviteeData: "${invitee}") 
          }
        `,
      })
      .pipe(
        map((res) => {
          console.log(res)
          this.spinner.hide();
          return res.data.friendInvite;
          
        })
      );
    }
  delete(id: number) {}
}
