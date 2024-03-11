import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {default as categoryJson} from "./categories.json"

@Component({
  selector: 'category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent implements OnInit {
  categories: CategoryJson[] = [];

  ngOnInit(): void {
    this.categories = categoryJson.mainCategories;
  }

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,) {
  }

  close() {
    this.dialogRef.close();
  }


  submit(category: CategoryJson) {
    this.dialogRef.close(category);
  }
}

export interface CategoryJson {
  id: number;
  name: string;
  icon: string;
  expanded?: boolean;
  subCategories?: CategoryJson[];
}
