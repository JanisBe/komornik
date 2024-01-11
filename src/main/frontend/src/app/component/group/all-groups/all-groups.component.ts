import {Component, OnInit} from '@angular/core';
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";
import {GroupService} from "../../../service/group.service";
import {ExpenseService} from "../../../service/expense.service";
import {SettlementDialogComponent} from "../../expense/settlement-dialog/settlement-dialog.component";
import {Group} from "../../../model/group";
import {AddExpenseComponent} from "../../expense/add-expense/add-expense.component";

@Component({
  selector: 'all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {
  allGroups: Group[];
  categoryIconName: "euro";

  constructor(private groupService: GroupService,
              private snackBarService: SnackbarService,
              private expenseService: ExpenseService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.findAllGroupsForUser();
  }

  findAllGroupsForUser() {
    this.groupService.findAllGroupsForUser().subscribe(groups => this.allGroups = groups.body!);

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
          this.snackBarService.displayMessage(`Grupa ${groupName} skasowana`, 3000);
          this.findAllGroupsForUser();
        });
      }
    });
  }

  addExpense(groupId: number) {
    this.dialog.open(AddExpenseComponent, {data: {groupId: groupId}, width: '600px'});
  }

  listExpense(groupId: number) {
    this.router.navigate(['expense/list', groupId]);
  }

  settle(group: Group) {
    this.expenseService.calculateExpenses(group.id!).subscribe(debts => {
      this.dialog.open(SettlementDialogComponent, {
        data: {debts: debts, group: group}
      });
    });
  }

  pickIcon() {

  }
}
