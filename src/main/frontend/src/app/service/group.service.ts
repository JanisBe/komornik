import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Group} from "../interfaces/group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) {
  }

  createGroup(group: Group) {
    return this.httpClient.post<Group>("http://localhost:8088/group/save", group);
  }

  editGroup(group: Group) {
    return this.httpClient.patch<Group>("http://localhost:8088/group/edit", group);
  }

  deleteGroup(groupId: number) {
    return this.httpClient.delete<Group>("http://localhost:8088/group/delete/" + groupId);
  }


}
