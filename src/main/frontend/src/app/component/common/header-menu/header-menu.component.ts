import {Component} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
