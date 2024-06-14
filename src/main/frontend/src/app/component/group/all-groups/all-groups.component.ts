import {Component, OnInit} from '@angular/core';
import {SnackbarService} from "../../../service/snackbar.service";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";
import {GroupService} from "../../../service/group.service";
import {ExpenseService} from "../../../service/expense.service";
import {SettlementDialogComponent} from "../../expense/settlement-dialog/settlement-dialog.component";
import {Group} from "../../../model/group";
import {AddExpenseComponent} from "../../expense/add-expense/add-expense.component";
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {NgFor, NgIf} from '@angular/common';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoadingService} from "../../../service/loading.service";
import {SpinnerComponent} from "../../common/spinner/spinner.component";

@Component({
  selector: 'all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, MatCard, MatCardHeader, MatIcon, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent, MatTooltip, MatCardActions, RouterLink, MatProgressSpinner, SpinnerComponent]
})
export class AllGroupsComponent implements OnInit {
  allGroups: Group[];
  categoryIconName: "euro";
  isLoading: boolean = true;

  constructor(private groupService: GroupService,
              private snackBarService: SnackbarService,
              private expenseService: ExpenseService,
              private router: Router,
              private dialog: MatDialog,
              protected loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.findAllGroupsForUser();
  }

  findAllGroupsForUser() {
    this.groupService.findAllGroupsForUser().subscribe(groups => {
      this.allGroups = groups.body!;
      this.isLoading = false;
    });

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
        data: {debts: debts, groupDefaultCurrency: group.defaultCurrency}
      });
    });
  }

  pickIcon() {

  }
}
