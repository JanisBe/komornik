import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {SnackbarService} from "../../../service/snackbar.service";
import {UserService} from "../../../service/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public user: User;
  public user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['userId'];
    if (id) {
      this.user$ = this.userService.getUserById(id)
    }
  }
}
