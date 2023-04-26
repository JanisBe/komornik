import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../interfaces/category";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private snackbarService: SnackbarService) {
  }

  onSubmit() {
    const newCategory: Category = {
      name: this.form.value.name
    }
    this.categoryService.createCategory(newCategory).subscribe(result => {
      this.snackbarService.displayMessage(`Nowa kategoria ${result.name} założona!`);
      this.onCancel();
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  onCancel() {
    this.router.navigate(['category/list']);
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
}
