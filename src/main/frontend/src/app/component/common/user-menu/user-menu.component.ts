import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../../model/user";
import {GravatarModule} from 'ngx-gravatar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  standalone: true,
  imports: [MatButton, MatMenuTrigger, GravatarModule, MatMenu, MatMenuItem, RouterLink]
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
