import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../interfaces/category";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";

@Component({
  selector: 'all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
  categories: [Category];
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
      data: {content: category.name, category: 'category'},
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe(
          () => {
            this.snackbarService.displayMessage(`Kategoria ${category.name} została skasowana`);
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
