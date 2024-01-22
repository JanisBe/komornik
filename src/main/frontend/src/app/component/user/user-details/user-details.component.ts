import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {SnackbarService} from "../../../service/snackbar.service";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.userService.getUser(id).subscribe(user => {
        this.user = user;
      });
    }
  }
}
