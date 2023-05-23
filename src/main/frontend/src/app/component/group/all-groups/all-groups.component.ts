import {Component, OnInit} from '@angular/core';
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";
import {GroupService} from "../../../service/group.service";
import {Group} from "../../../interfaces/group";
import {User} from 'src/app/interfaces/user';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit{
  allGroups: {
    userNames: string[];
    id?: number | undefined;
    name: string;
    defaultCurrency?: string;
    groupDescription: string;
    users: User[];
  }[];
  displayedColumns: string[] = ['name', 'users', 'defaultCurrency', 'actions'];
  private userId: number;

  constructor(private groupService: GroupService,
              private snackBarService: SnackbarService,
              private router: Router,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userId = this.authService.user.value?.id!;
    this.findAll();
  }

  findAll() {
    this.groupService.findAllGroupsForUser(this.userId).subscribe(groups => {
        this.allGroups = groups.map((group) => ({
          ...group,
          userNames: group.users.map((user) => (user.name))
        }));
      }
    );

  }

  editGroup(group: Group) {
    this.router.navigate(['group/details', group.id]);
  }

  deleteGroup(group: Group) {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {content: group.name, category: 'group'},
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteGroup(group.id).subscribe(() => {
          this.snackBarService.displayMessage(`Użytkownik ${group.name} skasowany`);
          this.findAll();
        });
      }
    });
  }

    addExpense(groupId: number) {
        this.router.navigate(['expense/add', groupId]);
    }
}
