import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedUser: User | null;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('app-component')
    this.authService.autoLogin();
    this.loggedUser = this.authService.user.value!;
    if (!!this.loggedUser) {
      this.router.navigate(['/login']);
    }
  }

  onLoggedOut() {
    this.loggedUser = null;
  }
}
