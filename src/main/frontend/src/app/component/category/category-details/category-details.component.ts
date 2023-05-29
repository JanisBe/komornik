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
    private id: number;

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute) {
    }

    form: FormGroup;
    category: Category;

    onSubmit() {
        const category: Category = {
            id: this.id,
            name: this.form.value.name
        }
        this.categoryService.editCategory(category).subscribe(console.log);
    }

    ngOnInit(): void {
        this.initForm();
        this.id = this.route.snapshot.params['id'];
        this.categoryService.findById(this.id).subscribe(
            (category) => {
                this.category = category;
                this.form.patchValue({
                    name: category.name
                })
            });
    }

    initForm() {
        this.form = new FormGroup({
            name: new FormControl('name', Validators.required),
            id: new FormControl('id', Validators.required)
        });
    }
}
