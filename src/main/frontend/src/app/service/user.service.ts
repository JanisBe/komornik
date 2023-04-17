import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = {      headers: [
      { name: 'Content-Type', value: 'multipart/form-data' },
      { name: 'Access-Control-Allow-Origin', value: '*' },
      { name: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS, GET'},
      { name: 'Access-Control-Allow-Credentials', value: 'true'}
    ]}
  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<[User]>("http://localhost:8080/user/findAll")
  }

  addUser(user: User) {
    return this.http.post<User>("http://localhost:8080/user/save", user);
  }

  delete(userId: number) {
    return this.http.delete<User>("http://localhost:8080/user/delete"+userId);
  }

  edit(user: User) {
    return this.http.patch<User>("http://localhost:8080/user/edit", user,)
  }
}
