import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgIf, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class AllCategoriesComponent implements OnInit {
  categories: Category[];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private categoryService: CategoryService,
              private router: Router,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  editCategory(category: Category) {
    this.router.navigate(['category/details', category.id]);
  }

  deleteCategory(category: Category) {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {content: category.categoryName, category: 'category'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(category.id!).subscribe(
          () => {
            this.snackbarService.displayMessage(`Kategoria ${category.categoryName} została skasowana`, 3000);
            this.refreshData();
          }
        );
      }
    });

  }

  private refreshData() {
    this.categoryService.findAllCategories().subscribe(
      response => {
        this.categories = response;
      }
    )
  }
}
