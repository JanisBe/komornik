import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../interfaces/category";

@Component({
    selector: 'add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
    constructor(private categoryService: CategoryService) {
    }

    form: FormGroup;

    onSubmit() {
        const newCategory: Category = {
            name: this.form.value.name
        }
        this.categoryService.createCategory(newCategory).subscribe(console.log);
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required)
        })
    }
}
