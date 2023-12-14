import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {Observer} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {IconPickerComponent} from "../../common/icon-picker/icon-picker.component";

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  currentCategory: Category;
  currentCategoryId: number;
  categoryIconName: string;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private snackbarService: SnackbarService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  resolve: Observer<Category> = {
    next: (result) => {
      this.snackbarService.displayMessage(`Nowa kategoria ${result.name} założona!`);
      this.onCancel();
    },
    error: () => {
      this.snackbarService.displayMessage(`Nie udało się założyć kategorii`);
    },
    complete: () => {
    }
  }

  ngOnInit() {
    this.categoryIconName = "euro";
    if (!!this.route.snapshot.params['categoryId']) {
      this.currentCategoryId = this.route.snapshot.params['categoryId'];
      this.categoryService.findById(this.currentCategoryId).subscribe(
        category => {
          this.currentCategory = category;
          this.form.get('name')?.patchValue(category.name);
        }
      )
    }
    this.initForm();
  }

  onSubmit() {
    if (!!this.currentCategory) {
      this.patchCategory();
    } else {
      this.saveCategory();
    }
  }

  pickIcon() {
    const dialogRef = this.dialog.open(IconPickerComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(iconName => {
      if (iconName) {
        this.form.get('categoryIcon')?.patchValue(iconName);
        this.categoryIconName = iconName;
      }
    });
  }

  onCancel() {
    this.router.navigate(['category/list']);
  }

  private saveCategory() {
    const newCategory: Category = {
      name: this.form.value.name,
      categoryIconName: this.form.value.categoryIcon
    }
    this.categoryService.createCategory(newCategory).subscribe(this.resolve);
  }

  private patchCategory() {
    const categoryToSave: Category = {
      name: this.form.value.name,
      id: this.currentCategory.id,
      categoryIconName: this.form.value.categoryIcon

    }
    this.categoryService.editCategory(categoryToSave).subscribe(this.resolve);
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      categoryIcon: new FormControl(this.categoryIconName)
    });
  }
}
