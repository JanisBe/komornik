import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExpenseService} from "../../../service/expense.service";
import {Expense} from "../../../model/expense";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'group-summary',
  templateUrl: './group-summary.component.html',
  styleUrl: './group-summary.component.scss'
})
export class GroupSummaryComponent implements OnInit {
  groupId: number;
  expenses: Map<string, Expense[]> = new Map<string, Expense[]>();

  constructor(private expenseService: ExpenseService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params['groupId'];
    this.expenseService.findAllByGroupId(this.groupId).subscribe(expenses => {
      this.expenses = this.groupByDate(expenses);
      console.log(this.expenses);
    });

  }

  groupByDate(objects: Expense[]): Map<string, Expense[]> {
    return objects.reduce((groupedMap, currentObject) => {
      // Extract the date in a format that represents the day (YYYY-MM-DD)
      const dateKey = currentObject.date.toString().split('T')[0];

      // Check if there's already a group for the current day
      if (!groupedMap.has(dateKey)) {
        groupedMap.set(dateKey, []);
      }

      // Add the current object to the group
      groupedMap.get(dateKey)!.unshift(currentObject);

      return groupedMap;
    }, new Map<string, Expense[]>());
  }

  reverseKeyOrder = (a: KeyValue<string, Expense[]>, b: KeyValue<string, Expense[]>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
}