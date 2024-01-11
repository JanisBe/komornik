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
  private editMode: boolean;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private snackbarService: SnackbarService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  resolve: Observer<Category> = {
    next: (result) => {
      this.editMode ?
        this.snackbarService.displayMessage(`Kategoria ${result.categoryName} zaktualizowana!`, 3000) :
        this.snackbarService.displayMessage(`Nowa kategoria ${result.categoryName} założona!`, 300);
      this.onCancel();
    },
    error: () => {
      this.snackbarService.displayError(`Nie udało się założyć kategorii`);
    },
    complete: () => {
    }
  }

  ngOnInit() {
    this.categoryIconName = "euro";
    if (!!this.route.snapshot.params['categoryId']) {
      this.editMode = true;
      this.currentCategoryId = this.route.snapshot.params['categoryId'];
      this.categoryService.findById(this.currentCategoryId).subscribe(
        category => {
          this.currentCategory = category;
          this.form.get('categoryName')?.patchValue(category.categoryName);
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
      categoryName: this.form.value.categoryName,
      categoryIconName: this.form.value.categoryIcon
    }
    this.categoryService.createCategory(newCategory).subscribe(this.resolve);
  }

  private patchCategory() {
    const categoryToSave: Category = {
      categoryName: this.form.value.categoryName,
      id: this.currentCategory.id,
      categoryIconName: this.form.value.categoryIcon

    }
    this.categoryService.editCategory(categoryToSave).subscribe(this.resolve);
  }

  private initForm() {
    this.form = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
      categoryIcon: new FormControl(this.categoryIconName)
    });
  }
}
