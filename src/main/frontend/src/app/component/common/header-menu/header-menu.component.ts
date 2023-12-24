import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddExpenseComponent} from "../../expense/add-expense/add-expense.component";

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  @Output() loggedOut: EventEmitter<void> = new EventEmitter<void>();
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logout() {
    this.loggedOut.emit();
    this.authService.logout();
  }

  addExpense() {
    this.dialog.open(AddExpenseComponent, {data: {groupId: 3}, width: '600px'});
  }
}
