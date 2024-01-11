import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  allUsers: User[];
  displayedColumns: string[] = ['name', 'mail', 'password', 'actions'];

  constructor(private userService: UserService,
              private snackBarService: SnackbarService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.userService.getAllUsers().subscribe(res =>
      this.allUsers = res);
  }

  editUser(userId: number) {
    this.router.navigate(['user/details', userId]);
  }

  deleteUser(user: User) {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {content: user.name, category: 'user'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.snackBarService.displayMessage(`Użytkownik ${user.name} skasowany`, 3000);
          this.findAll();
        });
      }
    });
  }

}
