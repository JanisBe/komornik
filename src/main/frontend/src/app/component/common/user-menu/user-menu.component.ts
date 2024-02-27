import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../model/user";

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent implements OnInit {

  currentUser: User | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
