import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../model/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get<[User]>(`${environment.API_URL}/user/findAll`)
  }

  addUser(user: User) {
    return this.http.post<User>(`${environment.API_URL}/user/save`, user, {observe: "response"});
  }

  deleteUser(userId: number) {
    return this.http.delete<User>(`${environment.API_URL}/user/delete/${userId}`);
  }

  getUser(user: User) {
    return this.http.get<User>(`${environment.API_URL}/user/get/${user.id}`)
  }

  editUser(user: User) {
    return this.http.patch<User>(`${environment.API_URL}/user/edit`, user,)
  }

  findCommonFriends(userId: number) {
    return this.http.get<User[]>(`${environment.API_URL}/user/findCommonUsers/${userId}`);
  }

  findUsersInGroup(groupId: number) {
    return this.http.get<User[]>(`${environment.API_URL}/user/findUsersInGroup/${groupId}`)
  }

  forgotPassword(user: User) {
    return this.http.post<string>(`${environment.API_URL}/user/forgotPassword/`, user, {
      observe: "response",
      responseType: "text" as "json"
    });
  }

  verifyUser(token: string, userId: string) {
    const params: HttpParams = new HttpParams({fromString: "token=" + token + "&userId=" + userId});
    return this.http.post<User>(`${environment.API_URL}/user/verifyUser/`, null, {
      observe: "response",
      params: params
    });
  }
}

