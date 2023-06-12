import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";

@Component({
  selector: 'edit-category',
  templateUrl: '../add-category/add-category.component.html',
  styleUrls: ['../add-category/add-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  categoryId: number;
  editedCategory: Category;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private snackbarService: SnackbarService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['id'];
    this.categoryService.findById(this.categoryId).subscribe(
      category => {
        this.editedCategory = category;
        this.initForm();
      });

  }

  onSubmit() {
    const newCategory: Category = {
      name: this.form.value.name,
      id: this.editedCategory.id
    }
    this.categoryService.editCategory(newCategory).subscribe({
      next: (result) => {
        this.snackbarService.displayMessage(`Kategoria ${result.name} zapisana!`);
        this.onCancel();
      },
      error: () => {
        this.snackbarService.displayMessage(`Nie udało się zapisać kategorii ${newCategory.name}`);
      }
    });
  }

  onCancel() {
    this.router.navigate(['category/list']);
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl('this.editedCategory.name', Validators.required)
    });
  }
}
