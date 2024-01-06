import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get<[User]>("http://localhost:8080/user/findAll")
  }

  addUser(user: User) {
    return this.http.post<User>("http://localhost:8080/user/save", user, {observe: "response"});
  }

  deleteUser(userId: number | undefined) {
    return this.http.delete<User>("http://localhost:8080/user/delete/" + userId);
  }

  editUser(user: User) {
    return this.http.patch<User>("http://localhost:8080/user/edit", user,)
  }

  findCommonFriends(userId: number) {
    return this.http.get<User[]>("http://localhost:8080/user/findCommonUsers/" + userId);
  }

  findUsersInGroup(groupId: number) {
    return this.http.get<User[]>("http://localhost:8080/user/findUsersInGroup/" + groupId)
  }

  forgotPassword(user: User) {
    return this.http.post<string>("http://localhost:8080/user/forgotPassword/", user, {
      observe: "response",
      responseType: "text" as "json"
    });
  }

  verifyUser(token: string, userId: string) {
    const verifyUser: VerifyUser = {
      token: token,
      userId: parseInt(userId)
    }
    return this.http.post<User>("http://localhost:8080/user/verifyUser/", {verifyUser}, {
      observe: "response",
      responseType: "text" as "json"
    });
  }
}

type VerifyUser = {
  token: string,
  userId: number
}
