import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";
import {Observable} from "rxjs";
import {AsyncPipe} from '@angular/common';
import {GravatarModule} from 'ngx-gravatar';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [GravatarModule, AsyncPipe]
})
export class UserDetailsComponent implements OnInit {
  public user: User;
  public user$: Observable<User>;

  @Input() userId: string

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    if (!!this.userId) {
      this.user$ = this.userService.getUserById(this.userId)
    }
  }
}
