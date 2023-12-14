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
    // this.loggedUserSub?.subscribe(value => {
    //   if (value == null) {
    //     this.loggedUser = null;
    //   }
    // });
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggedUser = this.authService.user.value!;
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
    }
  }

  onLoggedOut() {
    this.loggedUser = null;
  }
}
