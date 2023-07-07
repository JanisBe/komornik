import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Group} from "../model/group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) {
  }

  createGroup(group: Group) {
    return this.httpClient.post<Group>("http://localhost:8080/group/save", group);
  }

  editGroup(group: Group) {
    return this.httpClient.patch<Group>("http://localhost:8080/group/edit", group);
  }

  deleteGroup(groupId: number) {
    return this.httpClient.delete<Group>("http://localhost:8080/group/delete/" + groupId);
  }

  findAllGroupsForUser(userId: number) {
    return this.httpClient.get<Group[]>("http://localhost:8080/group/findAllGroupsForUser/" + userId);
  }

  findById(id: number) {
    return this.httpClient.get<Group>("http://localhost:8080/group/findById/" + id);
  }
}
