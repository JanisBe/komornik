import {Component, OnInit} from '@angular/core';
import {Category} from "../../../model/category";
import {CategoryService} from "../../../service/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  iconName?: string
  form: FormGroup;
  category: Category;
  private id: number;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  onSubmit() {
    const category: Category = {
      id: this.id,
      name: this.form.value.name,
      categoryIconName: this.form.value.categoryIconName
    }
    this.categoryService.editCategory(category).subscribe(console.log);
  }

  ngOnInit(): void {
    this.initForm();
    this.id = this.route.snapshot.params['id'];
    this.categoryService.findById(this.id).subscribe(
      (category) => {
        this.category = category;
        this.iconName = category.categoryIconName
        this.form.patchValue({
          name: category.name,
          categoryIconName: category.categoryIconName
        })
      });
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('name', Validators.required),
      categoryIconName: new FormControl('categoryIconName'),
      id: new FormControl('id', Validators.required)
    });
  }
}
