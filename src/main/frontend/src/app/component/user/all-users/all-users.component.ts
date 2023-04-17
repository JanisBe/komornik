import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {User} from "../../../interfaces/user";
import {SnackbarService} from "../../../service/snackbar.service";

@Component({
  selector: 'all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  allUsers: [User];
  displayedColumns: string[] = ['name', 'mail', 'password', 'actions'];
  constructor(private userService: UserService,
  private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.userService.getAllUsers().subscribe((res) =>
      this.allUsers = res)
  }

  editUser(user: User) {
    this.userService.edit(user).subscribe((res) => {
      this.snackBarService.displayMessage(`Użytkownik ${res.name} zapisany`)
    })
  }

  deleteUser(user: User) {
    this.userService.delete(user.id).subscribe((res) => {
      this.snackBarService.displayMessage(`Użytkownik ${res.name} skasowany`)
    })
  }
}
