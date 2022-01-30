import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private spinner: NgxSpinnerService
  ) {}

  //sprawdzenie czy użytkownikowi został nadany token przy logowaniu
  public isUserLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  //pobieranie listy znajomych na podstawie id użytkownika
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

  getUserDataForFriendInviteByUsername(username: String) {
    this.spinner.show();
    return this.apollo
      .query<any>({
        query: gql`
          query {
            getUserData(username: "${username}"){
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

  inviteFriend(inviteeUsername) {
    this.spinner.show();
    let userData = {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('currentUser'),
      email: localStorage.getItem('email'),
    };

    this.getUserDataForFriendInviteByUsername(inviteeUsername).subscribe(
      (data) => {
        let invitee = {
          userId: data.id,
          username: data.username,
          email: data.email,
        };

        return this.apollo
          .mutate<any>({
            mutation: gql`
            mutation {
              friendInvite(
              userData: {
                userId: "${userData.userId}",
                username: "${userData.username}",
                email: "${userData.email}",
              }, 
              inviteeData: {
                userId: "${invitee.userId}",
                username: "${invitee.username}",
                email: "${invitee.email}",
              }) 
            }
          `,
          })
          .pipe(
            map((res) => {
              this.spinner.hide();
              return res.data.friendInvite;
            })
          )
          .subscribe();
      }
    );
  }

  acceptFriendInvite(inviteeData) {
    let userData = {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('currentUser'),
      email: localStorage.getItem('email'),
    };
    let invitee = {
      userId: inviteeData.userId,
      username: inviteeData.username,
      email: inviteeData.email,
    };

    this.spinner.show();
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation {
            acceptFriendInvite(
            userData: {
              userId: "${userData.userId}",
              username: "${userData.username}",
              email: "${userData.email}",
            }, 
            inviteeData: {
              userId: "${invitee.userId}",
              username: "${invitee.username}",
              email: "${invitee.email}",
            }) 
          }
        `,
      })
      .pipe(
        map((res) => {
          this.spinner.hide();
          return res.data.acceptFriendInvite;
        })
      );
  }

  sendEmailInvitation(inviteeData, message) {
    let userData = {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('currentUser'),
      email: localStorage.getItem('email'),
    };
    let invitee = {
      userId: inviteeData.userId,
      username: inviteeData.username,
      email: inviteeData.email,
    };
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation {
            emailInvite(
            userData: {
              userId: "${userData.userId}",
              username: "${userData.username}",
              email: "${userData.email}",
            }, 
            inviteeData: {
              userId: "${invitee.userId}",
              username: "${invitee.username}",
              email: "${invitee.email}",
            }
            message: "${message}"
            ),
          }
        `,
      })
      .pipe(
        map((res) => {
          this.spinner.hide();
          return res.data.emailInvite;
        })
      );
  }

  checkIfUsernameExists(username) {
    return this.apollo
      .query<any>({
        query: gql`
          query {
            checkIfUsernameExists(username: "${username}"),
          }
        `,
      })
      .pipe(
        map((res) => {
          this.spinner.hide();
          return res.data.checkIfUsernameExists;
        })
      );
  }
}
