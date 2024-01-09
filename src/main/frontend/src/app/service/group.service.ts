import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Group} from "../model/group";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) {
  }

  createGroup(group: Group) {
    return this.httpClient.post<Group>(`http://${environment.API_URL}/group/save`, group, {observe: "response"});
  }

  editGroup(group: Group) {
    return this.httpClient.patch<Group>(`http://${environment.API_URL}/group/edit`, group);
  }

  deleteGroup(groupId: number) {
    return this.httpClient.delete<Group>(`http://${environment.API_URL}/group/delete/` + groupId);
  }

  findAllGroupsForUser() {
    return this.httpClient.get<Group[]>(`http://${environment.API_URL}/group/findAllGroupsForCurrentUser/`, {observe: "response"});
  }

  findById(id: number) {
    return this.httpClient.get<Group>(`http://${environment.API_URL}/group/findById/${id}`);
  }
}
