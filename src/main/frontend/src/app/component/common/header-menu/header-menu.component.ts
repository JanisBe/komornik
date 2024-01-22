import {Component} from '@angular/core';

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  // @Output() loggedOut: EventEmitter<void> = new EventEmitter<void>();
  // isAuthenticated = false;
  // private userSub: Subscription;
  //
  // constructor(private authService: AuthService,
  //             private dialog: MatDialog) {
  // }
  //
  // ngOnInit() {
  //   this.userSub = this.authService.user.subscribe(user => {
  //     this.isAuthenticated = !!user;
  //   });
  // }
  //
  // logout() {
  //   this.loggedOut.emit();
  //   this.authService.logout();
  // }
  //
  // addExpense() {
  //   this.dialog.open(AddExpenseComponent, {data: {groupId: 3}, width: '600px'});
  // }
  //
  // open() {
  //   this.dialog.open(SplitDialogComponent, {data: {groupId: 3}, width: '600px'});
  // }
}
