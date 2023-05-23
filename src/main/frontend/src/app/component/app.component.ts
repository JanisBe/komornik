import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userName = this.authService.user.value?.name!;
  }

}
