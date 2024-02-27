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
    return this.httpClient.post<Group>(`${environment.API_URL}/group/save`, group, {observe: "response"});
  }

  editGroup(group: Group) {
    return this.httpClient.patch<Group>(`${environment.API_URL}/group/edit`, group);
  }

  deleteGroup(groupId: number) {
    return this.httpClient.delete<Group>(`${environment.API_URL}/group/delete/` + groupId);
  }

  findAllGroupsForUser() {
    return this.httpClient.get<Group[]>(`${environment.API_URL}/group/findAllGroupsForCurrentUser/`, {
      observe: "response",
      withCredentials: true
    });
  }

  findById(id: number) {
    return this.httpClient.get<Group>(`${environment.API_URL}/group/findById/${id}`);
  }
}
