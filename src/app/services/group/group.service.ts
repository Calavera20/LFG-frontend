import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private apollo: Apollo, private spinner: NgxSpinnerService) { }

  //
  removeMember(groupId: string, username: string) {
    this.spinner.show();
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation{
          addGroupPermissionChange(change: {groupId: "${groupId}", change: "remove ${username}"}){
            change
          }
        }
        `,
      })
      .pipe(
        map((res) => {
          this.dbMemberRemove(groupId, username).subscribe();
          return res.data.addGroupPermissionChange;
        })
      );
  }

  


  
  dbMemberRemove(groupId: string, username: string){
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation{
          removeMember(groupId: "${groupId}", member: "${username}")       
          
        }
        `,
      })
      .pipe(
        map((res) => {
          this.spinner.hide();
          return res.data.removeMember;
        })
      );
  }

  dbAddMember(groupId: String, username: String){
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation{
          addMember(groupId: "${groupId}", member: "${username}")       
          
        }
        `,
      })
      .pipe(
        map((res) => {
          this.spinner.hide();
          return res.data.addMember;
        })
      );
  }

  removeGroup(groupId: String){
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation{
          removeGroup(groupId: "${groupId}")       
        }
        `,
      })
      .pipe(
        map((res) => {
          this.spinner.hide();
          return res.data.removeGroup;
        })
      );
  }
  sendJoinRequest(groupId: String, username: String){
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation{
          addDecision(decision: {groupId: "${groupId}", data: "join request ${username}"} ){
            data
            groupId
          }	
        }
        `,
      })
      .pipe(
        map((res) => {
          this.spinner.hide();
          return res.data.addDecision;
        })
      );
  }

  declineRequest(groupId: String, username: String){
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation{
          addDecision(decision: {groupId: "${groupId}", data: "request declined ${username}"} ){
            data
            groupId
          }	
        }
        `,
      })
      .pipe(
        map((res) => {
          this.spinner.hide();
          return res.data.addDecision;
        })
      );
  }

  acceptRequest(groupId: String, username: String){
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation{
          addDecision(decision: {groupId: "${groupId}", data: "accept ${username}"} ){
            data
            groupId
          }	
        }
        `,
      })
      .pipe(
        map((res) => {
          this.dbAddMember(groupId,username).subscribe();
          this.spinner.hide();
          return res.data.addDecision;
        })
      );
  }
}
