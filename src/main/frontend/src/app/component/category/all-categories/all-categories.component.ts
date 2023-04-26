import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../interfaces/category";
import {Route, Router} from "@angular/router";

@Component({
    selector: 'all-categories',
    templateUrl: './all-categories.component.html',
    styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
    constructor(private categoryService: CategoryService,
                private router: Router) {
    }
    categories:[Category];
    displayedColumns: string[] = ['name', 'actions'];
    ngOnInit(): void {
        this.categoryService.findAllCategories().subscribe(
            res => {
                this.categories = res;
            }
        )
    }

    editCategory(category: Category) {
        this.router.navigate(['category/details', category.id]);
    }

    deleteCategory(user: Category) {
        
    }
}
