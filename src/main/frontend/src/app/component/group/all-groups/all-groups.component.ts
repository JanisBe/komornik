import {Component, OnInit} from '@angular/core';
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";
import {GroupService} from "../../../service/group.service";
import {AuthService} from "../../../auth/auth.service";
import {ExpenseService} from "../../../service/expense.service";
import {SettlementDialogComponent} from "../../expense/settlement-dialog/settlement-dialog.component";
import {Group} from "../../../model/group";

@Component({
  selector: 'all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {
  allGroups: AllGroups[];
  displayedColumns: string[] = ['name', 'users', 'defaultCurrency', 'actions'];
  private userId: number;

  constructor(private groupService: GroupService,
              private snackBarService: SnackbarService,
              private expenseService: ExpenseService,
              private router: Router,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userId = this.authService.user.value?.id!;
    this.findAllGroupsForUser();
  }

  findAllGroupsForUser() {
    this.groupService.findAllGroupsForUser(this.userId).subscribe(groups => {
        this.allGroups = groups.map((group) => ({
          ...group,
          userNames: group.users.map((user) => (user.name))
        }));
      }
    );

  }

  editGroup(groupId: number) {
    this.router.navigate(['group/details', groupId]);
  }

  deleteGroup(groupId: number, groupName: string) {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {content: groupName, category: 'group'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteGroup(groupId).subscribe(() => {
          this.snackBarService.displayMessage(`Grupa ${groupName} skasowana`);
          this.findAllGroupsForUser();
        });
      }
    });
  }

  addExpense(groupId: number) {
    this.router.navigate(['expense/add', groupId]);
  }

  listExpense(groupId: number) {
    this.router.navigate(['expense/list', groupId]);
  }

  settle(group: AllGroups) {
    this.expenseService.calculateExpenses(group.id!).subscribe(debts => {
      let dialogRef = this.dialog.open(SettlementDialogComponent, {
        data: {debts: debts, group: group}
      });
    });
  }
}

export interface AllGroups extends Group {
  userNames: string[]
}
